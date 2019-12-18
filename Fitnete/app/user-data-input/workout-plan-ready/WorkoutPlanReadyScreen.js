import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';

import I18n from '../../utils/i18n/I18n';
import Container from '../../utils/components/Container';
import Button from '../../utils/components/Button';
import { push, Route } from '../../utils/navigation/NavigationService';
import WorkoutPlanReadyPresenter from './WorkoutPlanReadyPresenter';

class WorkoutPlanReadyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: 0
        }
        this.presenter = new WorkoutPlanReadyPresenter(this);
        this.goToPlan = this.goToPlan.bind(this);
    }

    componentDidMount() {
        this.presenter.loadData();
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    goToPlan() {
        push(Route.Purchase);
    }

    setData(data) {
        this.setState({ ...data });
    }

    render() {
        const { duration } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <Container>
                    <Text style={styles.description}>
                        {I18n.t('workoutPlanReady.description1')}
                    </Text>
                    {duration ?
                        <Text style={styles.description2}>
                            {I18n.t('workoutPlanReady.description2', { days: duration })}
                        </Text>
                        : null}
                    <Text style={styles.description3}>
                        {I18n.t('workoutPlanReady.description3')}
                    </Text>
                    <View style={styles.successImageContainer}>
                        <Image
                            style={styles.successImage}
                            source={{ uri: 'plan_ready' }}
                        />
                    </View>
                    <View style={styles.bottomContainer}>
                        <Button
                            title={I18n.t('workoutPlanReady.getYourPlan')}
                            onPress={this.goToPlan}
                        />
                    </View>
                </Container>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    description: {
        marginTop: 48,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#4F4C57',
        textAlign: 'center'
    },
    description2: {
        marginTop: 4,
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3E3750',
        textAlign: 'center'
    },
    description3: {
        marginTop: -4,
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3E3750',
        textAlign: 'center'
    },
    successImageContainer: {
        marginTop: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    successImage: {
        width: 246,
        height: 223,
        resizeMode: 'contain'
    },
    bottomContainer: {
        flex: 1,
        marginBottom: 16,
        justifyContent: 'flex-end'
    }
});

WorkoutPlanReadyScreen.navigationOptions = () => ({
    title: I18n.t('workoutPlanReady.title')
});

export default WorkoutPlanReadyScreen;
