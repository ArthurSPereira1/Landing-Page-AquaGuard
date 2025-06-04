document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVEGAÇÃO E ANIMAÇÕES =====
    
    // Selecionar todos os links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Selecionar todas as seções
    const sections = document.querySelectorAll('.section');
    
    // Selecionar o header
    const header = document.querySelector('.header');
    
    // Selecionar elementos para animação
    const sectionContents = document.querySelectorAll('.section-content');
    const dividerContents = document.querySelectorAll('.divider-content');
    
    // Função para destacar o link ativo com base na posição de rolagem
    function highlightActiveLink() {
        // Obter a posição atual de rolagem
        const scrollPosition = window.scrollY + 100; // Offset para compensar o header
        
        // Verificar qual seção está visível
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remover classe 'active' de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Adicionar classe 'active' ao link correspondente à seção atual
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Função para mudar o estilo do header ao rolar
    function toggleHeaderStyle() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Função para animar elementos quando visíveis
    function animateOnScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        sectionContents.forEach(content => {
            const contentTop = content.getBoundingClientRect().top;
            
            if (contentTop < triggerBottom) {
                content.classList.add('animate');
            }
        });
        
        dividerContents.forEach(content => {
            const contentTop = content.getBoundingClientRect().top;
            
            if (contentTop < triggerBottom) {
                content.classList.add('animate');
            }
        });
    }
    // ===== SLIDESHOW HERO =====
    
    // Selecionar elementos do slideshow
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slideshow-prev');
    const nextButton = document.querySelector('.slideshow-next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDelay = 5000; // 5 segundos entre slides
    
    // Função para mostrar um slide específico
    function showSlide(n) {
        // Remover classe 'active' de todos os slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remover classe 'active' de todos os indicadores
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Atualizar índice do slide atual
        currentSlide = (n + slides.length) % slides.length;
        
        // Adicionar classe 'active' ao slide atual
        slides[currentSlide].classList.add('active');
        
        // Adicionar classe 'active' ao indicador atual
        indicators[currentSlide].classList.add('active');
    }
    
    // Função para avançar para o próximo slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Função para voltar ao slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Função para iniciar o slideshow automático
    function startSlideshow() {
        // Limpar intervalo existente, se houver
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        
        // Definir novo intervalo
        slideInterval = setInterval(nextSlide, slideDelay);
    }
    
    // Função para pausar o slideshow automático
    function pauseSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Adicionar eventos aos botões de navegação
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            prevSlide();
            pauseSlideshow();
            startSlideshow(); // Reiniciar o slideshow após navegação manual
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            nextSlide();
            pauseSlideshow();
            startSlideshow(); // Reiniciar o slideshow após navegação manual
        });
    }
    
    // Adicionar eventos aos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
            pauseSlideshow();
            startSlideshow(); // Reiniciar o slideshow após navegação manual
        });
    });
    
    // Inicializar o slideshow
    showSlide(0);
    startSlideshow();
    
    // Pausar o slideshow quando o mouse estiver sobre ele
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', pauseSlideshow);
        slideshowContainer.addEventListener('mouseleave', startSlideshow);
    }
    
    

});

// ===== MENU HAMBÚRGUER MOBILE =====
    
    // Selecionar elementos do menu mobile
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Função para alternar o menu mobile
    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        
        // Adicionar/remover scroll do body quando o menu está aberto/fechado
        if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Adicionar evento de clique ao botão do menu
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Fechar o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && mainNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // ===== SELETORES DE TEMA =====
    
    // Selecionar botões de tema
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    // Função para alterar o tema
    function changeTheme(theme) {
        // Remover todas as classes de tema
        document.body.classList.remove('theme-dark', 'theme-light');
        
        // Adicionar a classe do tema selecionado (se não for o padrão)
        if (theme !== 'default') {
            document.body.classList.add(`theme-${theme}`);
        }
        
        // Atualizar botão ativo
        themeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });
        
        // Salvar preferência no localStorage
        localStorage.setItem('aquaguard-theme', theme);
    }
    
    // Adicionar evento de clique aos botões de tema
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            changeTheme(theme);
        });
    });
    
    // Verificar tema salvo no localStorage
    const savedTheme = localStorage.getItem('aquaguard-theme');
    if (savedTheme) {
        changeTheme(savedTheme);
    } else {
        // Definir tema padrão como ativo
        document.querySelector('.theme-btn[data-theme="default"]').classList.add('active');
    }
    // ===== BANNER DE CADASTRO =====
    
    // Selecionar elementos do banner
    const signupBanner = document.getElementById('signup-banner');
    const closeBannerBtn = document.getElementById('close-banner');
    const signupForm = document.getElementById('signup-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalOkBtn = document.getElementById('modal-ok');
    
    // Campos do formulário
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');
    const termosCheckbox = document.getElementById('termos');
    
    // Mensagens de erro
    const nomeError = document.getElementById('nome-error');
    const emailError = document.getElementById('email-error');
    const telefoneError = document.getElementById('telefone-error');
    const cepError = document.getElementById('cep-error');
    const termosError = document.getElementById('termos-error');
    
    // Função para mostrar o banner após um pequeno delay
    function showBanner() {
        // Verificar se o banner já foi fechado nesta sessão
        const bannerClosed = sessionStorage.getItem('banner-closed');
        
        if (!bannerClosed) {
            setTimeout(() => {
                signupBanner.classList.add('active');
                document.body.classList.add('has-banner');
                adjustHeaderPosition();
            }, 2000);
        }
    }
    
    // Função para fechar o banner
    function closeBanner() {
        signupBanner.classList.remove('active');
        document.body.classList.remove('has-banner');
        adjustHeaderPosition();
        
        // Salvar na sessão que o banner foi fechado
        sessionStorage.setItem('banner-closed', 'true');
    }
    
    // Função para ajustar a posição do header quando o banner está visível
    function adjustHeaderPosition() {
        if (signupBanner.classList.contains('active')) {
            const bannerHeight = signupBanner.offsetHeight;
            header.style.top = `${bannerHeight}px`;
        } else {
            header.style.top = '0';
        }
    }
    
    // Função para validar o formulário
    function validateForm() {
        let isValid = true;
        
        // Validar nome
        if (!nomeInput.value.trim()) {
            showError(nomeInput, nomeError, 'Nome é obrigatório');
            isValid = false;
        } else if (nomeInput.value.trim().length < 3) {
            showError(nomeInput, nomeError, 'Nome deve ter pelo menos 3 caracteres');
            isValid = false;
        } else {
            clearError(nomeInput, nomeError);
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError(emailInput, emailError, 'E-mail é obrigatório');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, emailError, 'E-mail inválido');
            isValid = false;
        } else {
            clearError(emailInput, emailError);
        }
        
        // Validar telefone
        const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        if (!telefoneInput.value.trim()) {
            showError(telefoneInput, telefoneError, 'Telefone é obrigatório');
            isValid = false;
        } else if (!telefoneRegex.test(telefoneInput.value.trim())) {
            showError(telefoneInput, telefoneError, 'Formato inválido. Use (XX) XXXXX-XXXX');
            isValid = false;
        } else {
            clearError(telefoneInput, telefoneError);
        }
        
        // Validar CEP
        const cepRegex = /^\d{5}-\d{3}$/;
        if (!cepInput.value.trim()) {
            showError(cepInput, cepError, 'CEP é obrigatório');
            isValid = false;
        } else if (!cepRegex.test(cepInput.value.trim())) {
            showError(cepInput, cepError, 'Formato inválido. Use XXXXX-XXX');
            isValid = false;
        } else {
            clearError(cepInput, cepError);
        }
        
        // Validar termos
        if (!termosCheckbox.checked) {
            showError(null, termosError, 'Você deve concordar com os termos');
            isValid = false;
        } else {
            clearError(null, termosError);
        }
        
        return isValid;
    }
    
    // Função para mostrar erro
    function showError(input, errorElement, message) {
        if (input) {
            input.parentElement.classList.add('error');
        }
        errorElement.textContent = message;
    }
    
    // Função para limpar erro
    function clearError(input, errorElement) {
        if (input) {
            input.parentElement.classList.remove('error');
        }
        errorElement.textContent = '';
    }
    
    // Função para formatar telefone automaticamente
    function formatTelefone(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            value = '(' + value;
        }
        if (value.length > 3) {
            value = value.substring(0, 3) + ') ' + value.substring(3);
        }
        if (value.length > 10) {
            value = value.substring(0, 10) + '-' + value.substring(10, 14);
        }
        
        e.target.value = value;
    }
    
    // Função para formatar CEP automaticamente
    function formatCEP(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 8);
        }
        
        e.target.value = value;
    }
    
    // Função para mostrar o modal de sucesso
    function showSuccessModal() {
        successModal.classList.add('active');
    }
    
    // Função para fechar o modal de sucesso
    function closeSuccessModal() {
        successModal.classList.remove('active');
    }
    
    // Adicionar eventos aos elementos do banner
    if (closeBannerBtn) {
        closeBannerBtn.addEventListener('click', closeBanner);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Simulação de envio bem-sucedido
                showSuccessModal();
                closeBanner();
                
                // Limpar formulário
                signupForm.reset();
            }
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeSuccessModal);
    }
    
    if (modalOkBtn) {
        modalOkBtn.addEventListener('click', closeSuccessModal);
    }
    
    // Adicionar formatação automática aos campos
    if (telefoneInput) {
        telefoneInput.addEventListener('input', formatTelefone);
    }
    
    if (cepInput) {
        cepInput.addEventListener('input', formatCEP);
    }
    
    // Mostrar o banner após carregar a página
    showBanner();
    
    // Ajustar posição do header quando a janela é redimensionada
    window.addEventListener('resize', adjustHeaderPosition);
    