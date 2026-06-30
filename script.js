/* ══════════════════════════════════════════
   NEXO DIGITAL — Interactions & Animations
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar scroll effect ──
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Mobile menu toggle ──
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ── Scroll reveal animations ──
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for sibling elements
                const siblings = entry.target.parentElement.querySelectorAll('.reveal');
                let delay = 0;
                siblings.forEach((sib, i) => {
                    if (sib === entry.target) delay = i * 100;
                });
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, Math.min(delay, 400));
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ── Counter animation ──
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        const duration = 2000;
        const start = performance.now();
        const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            el.textContent = Math.round(target * eased);
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }

    // ── Active nav link on scroll ──
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(section => sectionObserver.observe(section));

    // ── Typewriter Effect ──
    const twWord = document.getElementById('tw-word');
    if (twWord) {
        const words = ['venden.', 'facturan.', 'impactan.', 'convierten.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 150;

        const type = () => {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                twWord.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 75;
            } else {
                twWord.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        setTimeout(type, 1000);
    }

    // ── Three.js 3D Background ──
    const canvas = document.getElementById('bg3d');
    const isMobile = window.innerWidth < 768;
    if (canvas && typeof THREE !== 'undefined' && !isMobile) {
        let scene, camera, renderer, objects = [];
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;

        const initThree = () => {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 30;

            renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            const geometries = [
                new THREE.IcosahedronGeometry(7, 1),
                new THREE.TorusKnotGeometry(4, 1.2, 64, 8, 2, 3),
                new THREE.OctahedronGeometry(5, 1),
                new THREE.IcosahedronGeometry(6, 1)
            ];

            const colors = [0x6366f1, 0x06b6d4, 0x8b5cf6, 0x06b6d4];

            geometries.forEach((geom, idx) => {
                const mat = new THREE.MeshBasicMaterial({
                    color: colors[idx],
                    wireframe: true,
                    transparent: true,
                    opacity: 0.12
                });
                const mesh = new THREE.Mesh(geom, mat);
                
                if (idx === 0) mesh.position.set(-14, 8, -5);
                else if (idx === 1) mesh.position.set(15, -9, -8);
                else if (idx === 2) mesh.position.set(11, 9, -10);
                else mesh.position.set(-13, -11, -6);

                scene.add(mesh);
                objects.push(mesh);
            });
        };

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', onWindowResize);

        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) / 120;
            mouseY = (e.clientY - window.innerHeight / 2) / 120;
        });

        const animate = () => {
            requestAnimationFrame(animate);

            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;
            camera.position.x = targetX;
            camera.position.y = -targetY;
            camera.lookAt(scene.position);

            objects.forEach((obj, idx) => {
                obj.rotation.x += 0.0015 * (idx + 1);
                obj.rotation.y += 0.002 * (idx + 1);
                obj.rotation.z = window.scrollY * 0.0003 * (idx + 1);
            });

            renderer.render(scene, camera);
        };

        initThree();
        animate();
    }

    // ── 5-Step Intake Form Lógica ──
    const intakeForm = document.getElementById('nwIntakeForm');
    if (intakeForm) {
        let currentStep = 1;
        const totalSteps = 5;
        const stepNames = [
            "Tu negocio",
            "Contacto y redes",
            "Material visual",
            "Diseño y funciones",
            "Información final"
        ];

        const steps = intakeForm.querySelectorAll('.nw-step');
        const prevBtn = document.getElementById('nwBtnPrev');
        const nextBtn = document.getElementById('nwBtnNext');
        const finalOptions = document.getElementById('nwFinalOptions');
        const stepLabel = document.getElementById('nwStepLabel');
        const stepName = document.getElementById('nwStepName');
        const progressFill = document.getElementById('nwProgressFill');
        const dotsContainer = document.getElementById('nwStepDots');

        const initDots = () => {
            dotsContainer.innerHTML = '';
            for (let i = 1; i <= totalSteps; i++) {
                const dot = document.createElement('span');
                dot.className = `nw-dot ${i === 1 ? 'active' : ''}`;
                dot.addEventListener('click', () => {
                    if (i < currentStep) {
                        goToStep(i);
                    } else if (i > currentStep) {
                        let canGo = true;
                        for (let s = currentStep; s < i; s++) {
                            if (!validateStep(s)) {
                                canGo = false;
                                break;
                            }
                        }
                        if (canGo) goToStep(i);
                    }
                });
                dotsContainer.appendChild(dot);
            }
        };

        const updateDots = () => {
            const dots = dotsContainer.querySelectorAll('.nw-dot');
            dots.forEach((dot, idx) => {
                const stepNum = idx + 1;
                dot.className = 'nw-dot';
                if (stepNum === currentStep) {
                    dot.classList.add('active');
                } else if (stepNum < currentStep) {
                    dot.classList.add('completed');
                }
            });
        };

        const validateStep = (stepNum) => {
            const stepEl = intakeForm.querySelector(`.nw-step[data-step="${stepNum}"]`);
            const requiredFields = stepEl.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('field-error');
                    
                    const removeError = () => {
                        if (field.value.trim()) {
                            field.classList.remove('field-error');
                            field.removeEventListener('input', removeError);
                        }
                    };
                    field.addEventListener('input', removeError);
                } else {
                    field.classList.remove('field-error');
                }
            });

            return isValid;
        };

        const goToStep = (stepNum) => {
            steps.forEach(s => s.classList.remove('active'));
            const targetStep = intakeForm.querySelector(`.nw-step[data-step="${stepNum}"]`);
            targetStep.classList.add('active');

            currentStep = stepNum;

            stepLabel.textContent = `Paso ${currentStep} de ${totalSteps}`;
            stepName.textContent = stepNames[currentStep - 1];
            progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;

            if (currentStep === 1) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'block';
                finalOptions.style.display = 'none';
            } else if (currentStep === totalSteps) {
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'none';
                finalOptions.style.display = 'block';
            } else {
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'block';
                finalOptions.style.display = 'none';
            }

            updateDots();
        };

        window.nwChangeStep = (dir) => {
            if (dir === 1) {
                if (validateStep(currentStep)) {
                    goToStep(currentStep + 1);
                }
            } else {
                goToStep(currentStep - 1);
            }
        };

        window.nwToggleSelect = (btn) => {
            const group = btn.parentElement;
            const buttons = group.querySelectorAll('.nw-toggle-btn');
            buttons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            const inputName = btn.getAttribute('data-toggle');
            const val = btn.getAttribute('data-value');
            const hiddenInput = intakeForm.querySelector(`input[name="${inputName}"]`);
            if (hiddenInput) {
                hiddenInput.value = val;
            }

            if (inputName === 'nw_tiene_colores') {
                const condEl = document.getElementById('nw_cond_colores');
                if (condEl) {
                    condEl.style.display = val === 'si' ? 'block' : 'none';
                }
            }
            if (inputName === 'nw_tiene_logo') {
                const condEl = document.getElementById('nw_cond_logo');
                if (condEl) {
                    condEl.style.display = val === 'si' ? 'block' : 'none';
                }
            }
        };

        window.nwSubmitForm = async () => {
            if (!validateStep(currentStep)) return;

            const formData = new FormData(intakeForm);
            const data = {};
            formData.forEach((value, key) => {
                if (typeof value === 'string') {
                    data[key] = value;
                }
            });

            let logoUrl = '';
            const logoFileEl = document.getElementById('nw_logo_file');
            if (logoFileEl && logoFileEl.files && logoFileEl.files.length > 0 && data.nw_tiene_logo === 'si') {
                const submitBtn = document.querySelector('.nw-step[data-step="5"] button') || document.querySelector('.nw-next-btn') || document.querySelector('button[onclick="nwSubmitForm()"]');
                const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Enviar';
                
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner"></span> Subiendo logo...';
                }

                const file = logoFileEl.files[0];
                const fileData = new FormData();
                fileData.append('file', file);

                // Try file.io first (14 days retention)
                try {
                    const response = await fetch('https://file.io', {
                        method: 'POST',
                        body: fileData
                    });
                    const res = await response.json();
                    if (res.success) {
                        logoUrl = res.link;
                    } else {
                        throw new Error("file.io upload failed");
                    }
                } catch (e) {
                    console.warn("file.io failed, trying tmpfiles.org...", e);
                    // Fallback to tmpfiles.org (2 hours retention)
                    try {
                        const response = await fetch('https://tmpfiles.org/api/v1/upload', {
                            method: 'POST',
                            body: fileData
                        });
                        const res = await response.json();
                        if (res.status === 'success') {
                            logoUrl = res.data.url;
                        }
                    } catch (e2) {
                        console.error("All upload fallbacks failed:", e2);
                        logoUrl = 'Error al subir archivo (enviar por chat)';
                    }
                }

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            }

            let message = '';
            if (data.servicio === 'boceto-gratis') {
                message = `*SOLICITUD DE BOCETO GRATIS — NEXO DIGITAL*\n\n` +
                    `👤 *Nombre:* ${data.nw_nombre_contacto}\n` +
                    `📧 *Email:* ${data.nw_email || 'No especifica'}\n` +
                    `📞 *WhatsApp:* ${data.nw_whatsapp}\n` +
                    `🌐 *Web/Instagram:* ${data['web-ig'] || 'No especifica'}\n\n` +
                    `📝 *Detalle del Proyecto:* ${data.nw_descripcion}\n\n` +
                    `🎁 *Esta solicitud incluye un boceto de diseño inicial sin compromiso.*`;
            } else {
                message = `*SOLICITUD DE PRESUPUESTO — NEXO DIGITAL*\n\n` +
                    `👤 *Contacto:* ${data.nw_nombre_contacto}\n` +
                    `📞 *WhatsApp:* ${data.nw_whatsapp}\n` +
                    (data.nw_email ? `📧 *Email:* ${data.nw_email}\n` : '') +
                    `🏢 *Empresa:* ${data.nw_empresa}\n` +
                    `🗂️ *Rubro:* ${data.nw_rubro}\n` +
                    `📝 *Descripción:* ${data.nw_descripcion}\n\n` +
                    `🌐 *Servicio:* ${document.getElementById('servicio') ? document.getElementById('servicio').options[document.getElementById('servicio').selectedIndex].text : 'No especificado'}\n` +
                    `🌐 *Instagram:* ${data.nw_instagram || 'No especifica'}\n` +
                    (data['web-ig'] ? `🔗 *Web/IG adicional:* ${data['web-ig']}\n` : '') +
                    `📘 *Facebook:* ${data.nw_facebook || 'No especifica'}\n\n` +
                    `🎨 *Material Visual:*\n` +
                    `• ¿Tiene logo?: ${data.nw_tiene_logo === 'si' ? 'Sí' : 'No, necesita diseño'}\n` +
                    (data.nw_tiene_logo === 'si' && logoUrl ? `• Logo subido: ${logoUrl}\n` : '') +
                    `• Enlace a fotos adicionales: ${data.nw_links_fotos || 'No proporciona'}\n\n` +
                    `📐 *Diseño & Referencias:*\n` +
                    `• ¿Tiene colores?: ${data.nw_tiene_colores === 'si' ? 'Sí: ' + (data.nw_color_primario || '') : 'No, prefiere propuesta'}\n` +
                    `• Web de referencia: ${data.nw_webs_referencia || 'Ninguna'}\n\n` +
                    `💬 *Comentarios:* ${data.nw_adicional || 'Ninguno'}\n` +
                    `🔍 *Nos conoció por:* ${data.nw_como_conociste || 'No especifica'}`;
            }

            const encodedText = encodeURIComponent(message);
            const waUrl = `https://wa.me/5493795051607?text=${encodedText}`;
            window.open(waUrl, '_blank');
        };

        initDots();
    }

    // ── FAQ Accordion ──
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const wasActive = item.classList.contains('active');
            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            // Toggle clicked
            if (!wasActive) item.classList.add('active');
        });
    });

    // ── Smooth scroll for all anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
