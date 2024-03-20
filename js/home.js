document.addEventListener("DOMContentLoaded", function (event) {
    let locoScroll;
    locoScroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
    });
    new ResizeObserver(() => locoScroll.update()).observe(
        document.querySelector("[data-scroll-container]")
    );

    let preloader = document.querySelector(".preloader");

    preloader.style.opacity = 0;


    let menu = document.querySelector('.menu');
    let scrollPos = 0;

    locoScroll.on("scroll", (args) => {
        let progress = args.scroll.y;
        if (progress >= 150) {
            if (progress > scrollPos && !Boolean(+menu.getAttribute('data-nav-open'))) {
                menu.classList.add('hide')
            } else {
                menu.classList.remove('hide')
            }
        } else {
            menu.classList.remove('hide')
        }
        scrollPos = progress;
    })

    let timer = setTimeout(() => {
        preloader.remove();
    }, 450);
    return () => {
        clearTimeout(timer);
    }

});

class Accordion {
    constructor() {
        this._accordion = document.querySelector('[data-accordion]');
        this._items = this._accordion.querySelectorAll('ul > li');
        this.init();
        this.event();
    }

    init() {
        this._items.forEach(el => el.setAttribute('data-open', 0))
    }

    onClick(e) {
        const target = e.target;
        if (!target.closest('.Accordion-title')) {
            return;
        }
        const parent = target.closest('li');
        const body = parent.querySelector('.Accordion-body');
        let isOpen = parent.getAttribute('data-open');
        if (Boolean(+isOpen)) {
            body.style.height = 0;
            parent.setAttribute('data-open', 0);
            return;
        }
        body.style.height = body.scrollHeight + 'px';
        parent.setAttribute('data-open', 1);
    }

    event() {
        this._items.forEach(el => {
            el.addEventListener('click', this.onClick)
        })
    }
}

class NavBar {
    constructor() {
        this.menu = document.querySelector('.menu');
        this.navbar = this.menu.querySelector('.navbar-js');
        this.btn = this.navbar.querySelector('.navbar-btn-js');
        this.sidebar = this.menu.querySelector('.sidebar-js');
        this.init();
    }

    init() {
        this.menu.setAttribute('data-nav-open', 0);
        this.events();
    }


    onOpen() {
        this.menu.setAttribute('data-nav-open', 1);
    }

    onClose() {
        this.menu.setAttribute('data-nav-open', 0);
    }

    onClickNavBar() {
        const isNavBar = +this.menu.getAttribute('data-nav-open');
        if (Boolean(isNavBar)) {
            this.onClose();
            return;
        }

        this.onOpen();
    }

    onClick(e) {
        const target = e.target;
        const isNavBar = +this.menu.getAttribute('data-nav-open');

        if ((!target.closest('.sidebar')) && (!target.closest('.navbar')) && Boolean(isNavBar)) {
            this.onClose();
            return;
        }

        //this.onClose();
    }

    events() {
        this.btn.addEventListener('click', () => this.onClickNavBar());
        this.menu.addEventListener('click', (e) => this.onClick(e));
    }
}

new Accordion();
new NavBar();

document.addEventListener("DOMContentLoaded", function (event) {
    new Swiper('.event-slider', {
        slidesPerView: 2.8,
        spaceBetween: 30,
        centeredSlides: true,
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1.1,
                spaceBetween: 12
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 2,
                spaceBetween: 30
            },
        }
    });

    new Swiper('.press-slider', {
        slidesPerView: 1.1,
        spaceBetween: 12,
        centeredSlides: true,
        navigation: {
            nextEl: ".press-button-next",
            prevEl: ".press-button-prev",
        },
    });

    new Swiper('.team-slider', {
        breakpoints: {
            320: {
                slidesPerView: 1.1,
                spaceBetween: 12
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 2.5,
                spaceBetween: 30
            },
        }
    });
})


