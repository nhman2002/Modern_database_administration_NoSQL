class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="header">
        <a href="#" class="header-logo header-logo-top">
            <h1>
                <img src="./../images/home-img-logo.png" class="header-logo-img" alt="">
            </h1>
        </a>
        <div class="header-toggle">
            <i class='bx bx-menu header-toggle-menu'></i>
            <i class='bx bx-x header-toggle-close'></i>
        </div>
        <div class="header-side-menu">
            <div class=" header-top">
                <div class="header-wrapper container">
                    <a href="#" class="header-logo header-logo-side">
                        <h1>
                            <img src="./../images/home-img-logo.png" class="header-logo-img" alt="">
                        </h1>
                    </a>
                    <div class="header-contact">
                        <div class="header-contact-phone">
                            <i class='bx bxs-phone header-contact-icon'></i><span
                                class="header-contact-content">19006067</span>
                        </div>
                        <div class="header-contact-mail">
                            <i class="fa-solid fa-envelope header-contact-icon"></i><span
                                class="header-contact-content">Hotro@futabus.vn</span>
                        </div>
                    </div>

                    <div class="header-control">
                        <div class="header-social">
                            <a href="#" class="header-social-link">
                                <i class='bx bxl-facebook header-social-icon '></i>
                            </a>
                            <a href="#" class="header-social-link">
                                <i class='bx bxl-youtube header-social-icon '></i>
                            </a>
                        </div>
                        <ul class="header-language-list use-vn">
                            <li class="header-language-item">
                                <img src="./../images/VietNam.png" alt="" class="header-language-image">
                                <span class="header-language-text">VN</span>
                            </li>
                            <li class="header-language-item use-uk">
                                <img src="./../images/UK.png" alt="" class="header-language-image">
                                <span class="header-language-text">EN</span>
                            </li>
                        </ul>
                        <a href="#" class="header-login">
                            <i class='bx bxs-user-circle header-login-icon'></i>
                            <span class="header-login-text">Đăng nhập</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="header-bottom container">
                <a href="#" class="header-logo header-logo-inner">
                    <h1>
                        <img src="./../images/home-img-logo.png" class="header-logo-img" alt="">
                    </h1>
                </a>
                <ul class="header-nav">
                    <li class="header-nav-item header-nav-active">
                        <a href="#" class="header-nav-link">trang chủ</a>
                    </li>
                    <li class="header-nav-item">
                        <a href="#" class="header-nav-link">lịch trình</a>
                    </li>
                    <li class="header-nav-item">
                        <a href="#" class="header-nav-link">tin tức</a>
                    </li>
                    <li class="header-nav-item">
                        <a href="#" class="header-nav-link">tuyển dụng</a>
                    </li>
                    <li class="header-nav-item">
                        <a href="#" class="header-nav-link">liên hệ</a>
                    </li>
                    <li class="header-nav-item">
                        <a href="#" class="header-nav-link">hóa đơn</a>
                    </li>
                    <li class="header-nav-item">
                        <a href="#" class="header-nav-link">về chúng tôi</a>
                    </li>
                </ul>
                <img src="./../images/home-header-mascot1.png" alt="" class="header-bottom-imgleft header-bottom-img">
                <img src="./../images/home-header-mascot2.png" alt="" class="header-bottom-imgright header-bottom-img">
            </div>
        </div>
    </header>
        `
    }
}

async function createHeader() {
    await customElements.define('my-header', MyHeader);
    let newHeader = document.querySelector('my-header');
    console.log(newHeader);
    const menuToggle = document.querySelector('.header-toggle');
    const header = document.querySelector('.header');
    const sideMenu = document.querySelector('.header-side-menu');

    menuToggle.onclick = (e) => {
        header.classList.toggle('header-toggle-active');
    }

    window.onresize = (e) => {
        if (screen.width > 969) {
            header.classList.remove('header-toggle-active');
        }
    }
    window.onclick = (e) => {
        header.contains(e.target) || e.target.matches('.header-toggle') || header.classList.remove('header-toggle-active');
    }

    let lastScroll = 0;
    window.onscroll = (e) => {
        if (header.classList.contains('header-toggle-active')) {
            return;
        }
        if (screen.width > 969) {
            if (document.body.scrollTop > 102 || document.documentElement.scrollTop > 102) {
                header.classList.add('header-up');
            } else {
                header.classList.remove('header-up');
            }
        } else {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                header.classList.add('header-up-responsive');
            } else {
                header.classList.remove('header-up-responsive');
            }
            if (document.documentElement.scrollTop < lastScroll) {
                header.classList.remove('header-up-responsive');
            }
        }
        lastScroll = document.documentElement.scrollTop;
    }
}

createHeader();