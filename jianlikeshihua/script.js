// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有交互功能
    initNavbar();
    initSmoothScroll();
    initScrollAnimation();
    initScrollEffects();
    initHeroSlider();
    initHonorsSlider();
});

// Hero区背景图轮播功能
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const navDots = document.querySelectorAll('.nav-dot');
    const navThumbnails = document.querySelectorAll('.nav-thumbnail');
    let currentSlide = 0;
    const slideInterval = 3000; // 3秒切换一次
    let slideTimer;

    // 显示当前幻灯片
    function showSlide(index) {
        // 隐藏所有幻灯片
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        // 显示指定幻灯片
        slides[index].classList.add('active');
        
        // 更新导航点状态
        navDots.forEach(dot => {
            dot.classList.remove('active');
        });
        navDots[index].classList.add('active');
        
        // 更新微缩图状态
        navThumbnails.forEach(thumb => {
            thumb.classList.remove('active');
        });
        navThumbnails[index].classList.add('active');
        
        // 更新当前幻灯片索引
        currentSlide = index;
        
        // 重置定时器
        resetTimer();
    }

    // 切换到下一张幻灯片
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // 重置定时器
    function resetTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    // 初始化显示第一张幻灯片
    showSlide(currentSlide);
    
    // 设置自动轮播
    slideTimer = setInterval(nextSlide, slideInterval);
    
    // 添加导航点点击事件
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // 添加微缩图点击事件
    navThumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            showSlide(index);
        });
    });
}

// 导航栏功能初始化
function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // 汉堡菜单点击事件
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // 导航项点击事件（关闭菜单并滚动到对应区域）
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// 平滑滚动功能
function initSmoothScroll() {
    // 获取所有带有锚点的链接
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 阻止默认跳转行为
            e.preventDefault();

            // 获取目标元素的ID
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            // 获取目标元素
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 计算滚动位置（考虑固定导航栏的高度）
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                // 执行平滑滚动
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 滚动动画效果
function initScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');

    // 观察元素是否进入视口
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// 滚动时的导航栏效果
function initScrollEffects() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function() {
        // 导航栏背景变化
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// 添加加载动画
window.addEventListener('load', function() {
    // 页面加载完成后添加body类，移除加载状态
    document.body.classList.add('loaded');
});

// 响应式调整
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    // 如果是桌面设备且菜单处于打开状态，自动关闭
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// 为技能标签和项目卡片添加悬停动画效果
document.addEventListener('DOMContentLoaded', function() {
    // 技能标签悬停效果
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 项目卡片悬停效果
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 内容项悬停效果
    const contentItems = document.querySelectorAll('.content-item');
    contentItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// 显示微信视频号名称
function showWechatName() {
    const wechatName = document.getElementById('wechat-name');
    if (wechatName) {
        wechatName.style.display = 'block';
    }
}

// 荣誉轮播图功能
function initHonorsSlider() {
    // 确保元素存在
    const slides = document.querySelectorAll('.honors-slide');
    const navThumbnails = document.querySelectorAll('.honors-thumbnail');
    
    // 如果没有找到轮播图元素，直接返回
    if (slides.length === 0 || navThumbnails.length === 0) {
        console.log('荣誉轮播图元素未找到');
        return;
    }
    
    let currentSlide = 0;
    const slideInterval = 3000; // 3秒切换一次
    let slideTimer;

    // 显示当前幻灯片
    function showSlide(index) {
        // 隐藏所有幻灯片
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        // 显示指定幻灯片
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        
        // 更新微缩图状态
        navThumbnails.forEach(thumb => {
            thumb.classList.remove('active');
        });
        if (navThumbnails[index]) {
            navThumbnails[index].classList.add('active');
        }
        
        // 更新当前幻灯片索引
        currentSlide = index;
        
        // 重置定时器
        resetTimer();
    }

    // 切换到下一张幻灯片
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // 重置定时器
    function resetTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    // 初始化显示第一张幻灯片
    showSlide(currentSlide);
    
    // 设置自动轮播
    slideTimer = setInterval(nextSlide, slideInterval);
    
    // 添加微缩图点击事件
    navThumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            showSlide(index);
        });
    });
}