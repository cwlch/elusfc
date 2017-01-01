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
                '/driverDetails': {
                    component (resolve) {
                        require.ensure(["../module/driver/driverDetails.vue"], (require) => {
                            require(["../module/driver/driverDetails.vue"], resolve);
                    }, 'module/driver/DriverDetails');
                    }
                },
                '/driverRelease': {
                    component (resolve) {
                        require.ensure(["../module/driver/driverRelease.vue"], (require) => {
                            require(["../module/driver/driverRelease.vue"], resolve);
                    }, 'module/driver/DriverRelease');
                    }
                },
                '/driverList': {
                    component (resolve) {
                        require.ensure(["../module/driver/driverList.vue"], (require) => {
                            require(["../module/driver/driverList.vue"], resolve);
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
        },
        '/address' : {
            component (resolve) {
                require.ensure(["../module/common/address.vue"], (require) => {
                    require( ["../module/common/address.vue"],resolve );
                },'module/common/addres');
            }
        }
    })
};