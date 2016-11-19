class MainController {

    constructor($translate, $cookieStore, localStorageService, $anchorScroll, $location) {
        this.$translate = $translate;
        this.$location = $location;
        this.$anchorScroll = $anchorScroll;
        this.$cookieStore = $cookieStore;
        this.localStorageService = localStorageService;
        this.defaultLang = this.localStorageService.get('lang');
        this.languageSwitch = this.defaultLang === 'en-us' ? true : false;
    }

    $onInit() {
        this.menuItems = [
            {name: 'welcome', link: 'top', active: true},
            {name: 'about', link: 'story'},
            {name: 'pricing', link: 'pricing'},
            {name: 'beer', link: 'beer'},
            {name: 'bread', link: 'bread'},
            {name: 'featured', link: 'featured'},
            {name: 'reservation', link: 'reservation'},
            {name: 'contact', link: 'contact'},
            {name: 'language', link: ''}
        ];

        this.status = {
            isopen: false
        };
        if (!this.defaultLang) {
            this.defaultLang = 'en-us';
            this.localStorageService.set('lang', this.defaultLang);
        }
        this.$translate.use(this.defaultLang);
    }

    activeMenu(index) {
        for (let item of this.menuItems) {
            item.active = false;
        }
        this.menuItems[index].active = true;
    }

    toggleLanguage() {
        this.defaultLang = this.languageSwitch ? 'en-us' : 'es-es';
        this.$translate.use(this.defaultLang);
        this.localStorageService.set('lang', this.defaultLang);
    }

    changeLanguage(lang) {
        this.defaultLang = lang;
        this.$translate.use(this.defaultLang);
        this.localStorageService.set('lang', this.defaultLang);
    }

    toggled(open) {
        console.log('Dropdown is now: ', open);
    }

    toggleDropdown($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }
}
MainController.$inject = ['$translate', '$cookieStore', 'localStorageService', '$anchorScroll', '$location'];
export default MainController;