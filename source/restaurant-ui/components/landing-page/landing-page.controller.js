class ShellController {

    /*@ngInject*/
    constructor($translate) {
        //this.HttpInterceptor = HttpInterceptor;
        this.$translate = $translate;
        this.contextData = {};
    }

    $onInit() {
        this.stepTrackerIndex = 0;
        this.$translate(['depositIntake', 'transactionFeeds', 'regulationsApproval', 'confirmationNextSteps']).then((translation)=> {
            this.stepTrackerConfig = {
                step1: {
                    TAB_TITLE: translation.depositIntake
                },
                step2: {
                    TAB_TITLE: translation.transactionFeeds
                },
                step3: {
                    TAB_TITLE: translation.regulationsApproval
                },
                step4: {
                    TAB_TITLE: translation.confirmationNextSteps
                }
            };
        });
    }

    changeStep(step) {
        this.stepTrackerIndex = step;
    }

    next(value) {
        this.contextData = Object.assign({},value);
        return ++this.stepTrackerIndex;
    }
    contextDataChange(value) {
        this.contextData = Object.assign({},value);
    }

    back() {
        return this.stepTrackerIndex > 0 ? --this.stepTrackerIndex : this.stepTrackerIndex;
    }
}
ShellController.$inject = ['$translate'];
export default ShellController;