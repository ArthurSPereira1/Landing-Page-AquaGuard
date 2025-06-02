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