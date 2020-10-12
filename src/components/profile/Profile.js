import React, { Component } from 'react';

export default class Profile extends Component {

    render() {
        return (
            <div class="container">
                <div class='columns is-mobile is-centered'>
                    <div class='column is-7'>
                        <div class="box">
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-2by1">
                                    <img  src="noimage.jpg" alt="Placeholder image" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="media">
                                        <div class="media-left">
                                            <figure class="image is-128x128">
                                                <img class="is-rounded" src="noimage.jpg" alt="Placeholder image" />
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            {this.props.auth.isAuthenticated && this.props.auth.user &&
                                                (<p class="title is-6">@{this.props.auth.user.username}</p>)}

                                        </div>
                                    </div>

                                    <div class="content">


                                        <time ></time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

