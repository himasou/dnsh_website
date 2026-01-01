// DNSH Consulting - Dynamic Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Service box interaction
    const serviceBoxes = document.querySelectorAll('#boxes .box');
    
    serviceBoxes.forEach((box, index) => {
        // Staggered animation on load
        box.style.animationDelay = `${index * 0.1}s`;
        
        // Click interaction with details
        box.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            showServiceDetails(service);
        });
        
        // Add ripple effect on click
        box.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Service details data
    const serviceDetails = {
        'cloud-security': {
            title: 'Cloud Security Solutions',
            description: 'Our comprehensive cloud security services protect your data and applications across AWS, Azure, and Google Cloud platforms. We implement zero-trust architectures, advanced threat detection, and compliance frameworks.',
            features: [
                'Multi-cloud security assessments',
                'Identity and access management',
                'Encryption and data protection',
                'Compliance and governance',
                'Security monitoring and incident response'
            ]
        },
        'networking': {
            title: 'Enterprise Networking',
            description: 'Design and deploy robust, scalable network infrastructures that support your business growth. From SD-WAN to traditional networking, we ensure optimal performance and reliability.',
            features: [
                'Network design and architecture',
                'SD-WAN implementation',
                'Load balancing and optimization',
                'Network security and firewalls',
                'Performance monitoring'
            ]
        },
        'remote-support': {
            title: '24/7 Remote Support',
            description: 'Round-the-clock expert support whenever you need it. Our dedicated team provides rapid response times and effective solutions to keep your business running smoothly.',
            features: [
                '24/7 availability',
                'Average 15-minute response time',
                'Remote troubleshooting and resolution',
                'Proactive monitoring',
                'Scheduled maintenance support'
            ]
        },
        'office365': {
            title: 'Office 365 Expertise',
            description: 'Maximize your Microsoft 365 investment with expert deployment, migration, and optimization services. We help teams collaborate effectively and work smarter.',
            features: [
                'Microsoft 365 migration and deployment',
                'Teams and SharePoint optimization',
                'Security and compliance configuration',
                'User training and adoption',
                'Custom development and automation'
            ]
        }
    };
    
    function showServiceDetails(service) {
        const details = serviceDetails[service];
        if (!details) return;
        
        // Create modal if it doesn't exist
        let modal = document.getElementById('service-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'service-modal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2 id="modal-title"></h2>
                    <p id="modal-description"></p>
                    <h3>Key Features:</h3>
                    <ul id="modal-features"></ul>
                    <a href="services.html"><button class="button_1">Learn More</button></a>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Close modal functionality
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.onclick = () => modal.style.display = 'none';
            modal.onclick = (e) => {
                if (e.target === modal) modal.style.display = 'none';
            };
        }
        
        // Populate modal with service details
        document.getElementById('modal-title').textContent = details.title;
        document.getElementById('modal-description').textContent = details.description;
        
        const featuresList = document.getElementById('modal-features');
        featuresList.innerHTML = '';
        details.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
        
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('show'), 10);
    }
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Add active state to navigation on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('#navigation a').forEach(link => {
                    link.parentElement.classList.remove('current');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.parentElement.classList.add('current');
                    }
                });
            }
        });
    });
    
    // Counter animation for statistics (if you add them later)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);
    
    // Observe all service boxes
    serviceBoxes.forEach(box => observer.observe(box));
});
