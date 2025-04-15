// Funcionalidades adicionais para o site ReVitaliza Fitness

document.addEventListener('DOMContentLoaded', function() {
    // Implementação do formulário de newsletter
    const newsletterForm = document.querySelector('.newsletter-form form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            
            if (nameInput.value.trim() && emailInput.value.trim()) {
                // Simulação de envio bem-sucedido
                this.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Obrigado por se inscrever!</h3><p>Você receberá nossos artigos mais recentes diretamente no seu email.</p></div>';
            }
        });
    }
    
    // Implementação de filtro de categorias no blog
    const categoryButtons = document.querySelectorAll('.card .btn-secondary');
    if (categoryButtons.length > 0 && window.location.href.includes('blog.html')) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Simulação de filtro de categorias
                const category = this.parentNode.querySelector('h3').textContent;
                alert(`Filtrando artigos da categoria: ${category}`);
                
                // Em uma implementação real, aqui seria feita uma requisição AJAX
                // ou uma filtragem dos artigos já presentes na página
            });
        });
    }
    
    // Implementação de carregamento de mais artigos
    const loadMoreButton = document.querySelector('.pagination .btn-secondary');
    if (loadMoreButton && window.location.href.includes('blog.html')) {
        loadMoreButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulação de carregamento de mais artigos
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
            
            // Simulação de delay para mostrar o loading
            setTimeout(() => {
                this.innerHTML = 'Carregar mais artigos';
                alert('Mais artigos seriam carregados aqui em uma implementação real.');
            }, 1500);
        });
    }
    
    // Implementação de comparação de planos interativa
    const pricingCards = document.querySelectorAll('.pricing-card');
    if (pricingCards.length > 0 && window.location.href.includes('planos.html')) {
        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = this.classList.contains('featured') 
                    ? 'scale(1.08) translateY(-15px)' 
                    : 'translateY(-15px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = this.classList.contains('featured') 
                    ? 'scale(1.05)' 
                    : '';
            });
        });
    }
    
    // Implementação de validação de formulário de contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm && window.location.href.includes('contato.html')) {
        const formGroups = contactForm.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            if (input && input.required) {
                input.addEventListener('blur', function() {
                    validateInput(this);
                });
                
                input.addEventListener('input', function() {
                    if (this.classList.contains('invalid')) {
                        validateInput(this);
                    }
                });
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredInputs = this.querySelectorAll('input[required], textarea[required], select[required]');
            
            requiredInputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Simulação de envio bem-sucedido
                this.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Mensagem enviada com sucesso!</h3><p>Agradecemos seu contato. Nossa equipe responderá o mais breve possível.</p></div>';
            }
        });
        
        function validateInput(input) {
            const errorMessage = input.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
            
            input.classList.remove('invalid');
            
            if (!input.value.trim()) {
                showError(input, 'Este campo é obrigatório');
                return false;
            }
            
            if (input.type === 'email' && !isValidEmail(input.value)) {
                showError(input, 'Por favor, informe um email válido');
                return false;
            }
            
            return true;
        }
        
        function showError(input, message) {
            input.classList.add('invalid');
            
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '0.9rem';
            errorMessage.style.marginTop = '0.5rem';
            
            input.parentNode.appendChild(errorMessage);
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
    
    // Implementação de contador de caracteres para textarea
    const messageTextarea = document.querySelector('textarea[name="message"]');
    if (messageTextarea && window.location.href.includes('contato.html')) {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'character-counter';
        counterDiv.style.fontSize = '0.9rem';
        counterDiv.style.textAlign = 'right';
        counterDiv.style.marginTop = '0.5rem';
        
        messageTextarea.parentNode.appendChild(counterDiv);
        
        function updateCounter() {
            const maxLength = 500;
            const currentLength = messageTextarea.value.length;
            const remaining = maxLength - currentLength;
            
            counterDiv.textContent = `${currentLength}/${maxLength} caracteres`;
            
            if (remaining < 50) {
                counterDiv.style.color = 'red';
            } else {
                counterDiv.style.color = '';
            }
            
            if (currentLength > maxLength) {
                messageTextarea.value = messageTextarea.value.substring(0, maxLength);
                updateCounter();
            }
        }
        
        messageTextarea.addEventListener('input', updateCounter);
        updateCounter();
    }
    
    // Implementação de botão "Voltar ao topo"
    const body = document.querySelector('body');
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.width = '50px';
    backToTopButton.style.height = '50px';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.backgroundColor = 'var(--roxo-principal)';
    backToTopButton.style.color = 'var(--branco)';
    backToTopButton.style.border = 'none';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.display = 'none';
    backToTopButton.style.zIndex = '999';
    backToTopButton.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    backToTopButton.style.transition = 'all 0.3s ease';
    
    body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Implementação de preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.position = 'fixed';
    preloader.style.top = '0';
    preloader.style.left = '0';
    preloader.style.width = '100%';
    preloader.style.height = '100%';
    preloader.style.backgroundColor = 'var(--branco)';
    preloader.style.display = 'flex';
    preloader.style.justifyContent = 'center';
    preloader.style.alignItems = 'center';
    preloader.style.zIndex = '9999';
    preloader.style.transition = 'opacity 0.5s ease';
    
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.innerHTML = '<i class="fas fa-circle-notch fa-spin" style="font-size: 3rem; color: var(--roxo-principal);"></i>';
    
    preloader.appendChild(spinner);
    document.body.appendChild(preloader);
    
    // Remover preloader após o carregamento da página
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    });
});
