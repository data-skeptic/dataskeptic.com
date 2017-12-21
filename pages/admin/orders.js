import React, {Component} from "react"
import Link from "../../components/Link"
import Ionicon from "react-ionicons"
import styled from "styled-components"
import AdminPage from "../../hoc/AdminPage"
import Container from "../../components/Container"


@AdminPage
export default class Orders extends Component {
    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState();
        const promises = [];

        await Promise.all(promises);
    }

    render() {
        return (
            <Container title={`Orders`}>
                Orders list
            </Container>
        );
    }
}
