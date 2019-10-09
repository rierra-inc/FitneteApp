import UserDataSource from "../data/UserDataSource";

export default class AppIntroPresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new UserDataSource();
    }

    getData() {
        const data = [
            {
                id: '1',
                imageName: 'exercise_1',
                title: 'appIntro.page1Title',
                description: 'appIntro.page1Description'
            },
            { 
                id: '2',
                imageName: 'exercise_2',
                title: 'appIntro.page2Title',
                description: 'appIntro.page2Description'
            },
            {
                id: '3',
                imageName: 'exercise_3',
                title: 'appIntro.page3Title',
                description: 'appIntro.page3Description'
            }
        ]
        return data;
    }

    async didAcceptTerms() {
        const data = {
            didAcceptTerms: true
        };
        const success = await this.dataSource.setUser(data);
        if (success) {
            this.view.didAcceptTerms();
        }
    }

    unmountView() {
        this.view = null;
    }
}