document.addEventListener('DOMContentLoaded', function() {
    const slideshow = document.querySelector('.slideshow');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    const slideCount = slides.length;

    // 自動播放功能
    let slideInterval = setInterval(nextSlide, 5000);

    function updateSlideshow() {
        slideshow.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlideshow();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlideshow();
    }

    // 按鈕點擊事件
    nextButton.addEventListener('click', function() {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    prevButton.addEventListener('click', function() {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    // 觸控滑動功能
    let touchStartX = 0;
    let touchEndX = 0;

    slideshow.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    slideshow.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (swipeDistance > 50) {
            clearInterval(slideInterval);
            prevSlide();
            slideInterval = setInterval(nextSlide, 5000);
        } else if (swipeDistance < -50) {
            clearInterval(slideInterval);
            nextSlide();
            slideInterval = setInterval(nextSlide, 5000);
        }
    }

    // 進度條動畫
    const progressFill = document.querySelector('.progress-fill');
    const progressMarker = document.querySelector('.progress-marker');
    const progressPercentage = document.querySelector('.progress-percentage');

    function updateProgress(percentage) {
        progressFill.style.width = `${percentage}%`;
        progressMarker.style.left = `${percentage}%`;
        progressPercentage.textContent = `${percentage}%`;
    }

    // 模擬進度更新
    let currentProgress = 30;
    updateProgress(currentProgress);

    // 導航欄滾動效果
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            header.style.transform = 'translateY(-80px)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // 平滑滾動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 捐款方式卡片動畫
    const methods = document.querySelectorAll('.method');

    methods.forEach(method => {
        method.addEventListener('mouseenter', () => {
            method.style.transform = 'translateY(-5px)';
        });
        
        method.addEventListener('mouseleave', () => {
            method.style.transform = 'translateY(0)';
        });
    });

    // 響應式導航菜單
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // 頁面載入動畫
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}); 