/**
 * Created by Ch on 16/12/18.
 */

export default (route) => {
    route.map({
        '/driver' : {
            component (resolve) {
                require.ensure(["../module/driver/index.vue"], (require) => {
                    require( ["../module/driver/index.vue"],resolve );
                },'module/driver/index');
            },
            subRoutes : {
                '/list': {
                    component (resolve) {
                        require.ensure(["../module/driver/list.vue"], (require) => {
                            require(["../module/driver/list.vue"], resolve);
                        }, 'module/driver/list');
                    }
                },
                '/DriverDetails': {
                    component (resolve) {
                        require.ensure(["../module/driver/DriverDetails.vue"], (require) => {
                            require(["../module/driver/DriverDetails.vue"], resolve);
                    }, 'module/driver/DriverDetails');
                    }
                },
                '/DriverRelease': {
                    component (resolve) {
                        require.ensure(["../module/driver/DriverRelease.vue"], (require) => {
                            require(["../module/driver/DriverRelease.vue"], resolve);
                    }, 'module/driver/DriverRelease');
                    }
                },
                '/DriverList': {
                    component (resolve) {
                        require.ensure(["../module/driver/DriverList.vue"], (require) => {
                            require(["../module/driver/DriverList.vue"], resolve);
                    }, 'module/driver/DriverList');
                    }
                }
            }
        },
        '/passenger' : {
            component (resolve) {
                require.ensure(["../module/passenger/index.vue"], (require) => {
                    require( ["../module/passenger/index.vue"],resolve );
                },'module/passenger/index');
            },
            subRoutes : {
                '/searchRoute': {
                    component (resolve) {
                        require.ensure(["../module/passenger/searchRoute.vue"], (require) => {
                            require(["../module/passenger/searchRoute.vue"], resolve);
                    }, 'module/passenger/searchRoute');
                    }
                },
                '/findCar': {
                    component (resolve) {
                        require.ensure(["../module/passenger/findCar.vue"], (require) => {
                            require(["../module/passenger/findCar.vue"], resolve);
                    }, 'module/passenger/findCar');
                    }
                },
                '/PassengerResults': {
                    component (resolve) {
                        require.ensure(["../module/passenger/PassengerResults.vue"], (require) => {
                            require(["../module/passenger/PassengerResults.vue"], resolve);
                    }, 'module/passenger/PassengerResults');
                    }
                },
                '/PassengerDetails': {
                    component (resolve) {
                        require.ensure(["../module/passenger/PassengerDetails.vue"], (require) => {
                            require(["../module/passenger/PassengerDetails.vue"], resolve);
                    }, 'module/passenger/PassengerDetails');
                    }
                }
            }

        },
        '/account' : {
            component (resolve) {
                require.ensure(["../module/account/index.vue"], (require) => {
                    require( ["../module/account/index.vue"],resolve );
                },'module/account/index');
            }
        }
    })
};