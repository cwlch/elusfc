/**
 * Created by Ch on 16/12/18.
 */

export default (route) => {
    route.map({
        '/driver' : {
            title : 'e鹿同行-司机端',
            component (resolve) {
                require.ensure(["../module/driver/index.vue"], (require) => {
                    require( ["../module/driver/index.vue"],resolve );
                },'module/driver/index');
            },
            subRoutes : {
                '/driverRelease': {
                    name : 'driverRelease',
                    component (resolve) {
                        require.ensure(["../module/driver/driverRelease.vue"], (require) => {
                            require(["../module/driver/driverRelease.vue"], resolve);
                    }, 'module/driver/DriverRelease');
                    }
                },
                '/driverSearch': {
                    name : 'driverSearch',
                    component (resolve) {
                        require.ensure(["../module/driver/driverSearch.vue"], (require) => {
                            require(["../module/driver/driverSearch.vue"], resolve);
                    }, 'module/driver/driverSearch');
                    }
                },
                '/driverResults': {
                    name : 'driverRelease',
                    component (resolve) {
                        require.ensure(["../module/driver/driverResults.vue"], (require) => {
                            require(["../module/driver/driverResults.vue"], resolve);
                        }, 'module/driver/DriverList');
                    }
                },
                '/driverDetails': {
                    name : 'driverRelease',
                    component (resolve) {
                        require.ensure(["../module/driver/driverDetails.vue"], (require) => {
                            require(["../module/driver/driverDetails.vue"], resolve);
                        }, 'module/driver/DriverDetails');
                    }
                },
                '/home': {
                    name : 'driverRelease',
                    component (resolve) {
                        require.ensure(["../module/driver/home.vue"], (require) => {
                            require(["../module/driver/home.vue"], resolve);
                        }, 'module/driver/home');
                    }
                }
            }
        },
        '/passenger' : {
            title : 'e鹿同行-乘客端',
            component (resolve) {
                require.ensure(["../module/passenger/index.vue"], (require) => {
                    require( ["../module/passenger/index.vue"],resolve );
                },'module/passenger/index');
            },
            subRoutes : {
                '/passengerRelease': {
                    name : 'passengerRelease',
                    component (resolve) {
                        require.ensure(["../module/passenger/passengerRelease.vue"], (require) => {
                            require(["../module/passenger/passengerRelease.vue"], resolve);
                        }, 'module/passenger/findCar');
                    }
                },
                '/passengerSearch': {
                    name : 'passengerSearch',
                    component (resolve) {
                        require.ensure(["../module/passenger/passengerSearch.vue"], (require) => {
                            require(["../module/passenger/passengerSearch.vue"], resolve);
                    }, 'module/passenger/passengerSearch');
                    }
                },
                '/passengerResults': {
                    name : 'passengerSearch',
                    component (resolve) {
                        require.ensure(["../module/passenger/passengerResults.vue"], (require) => {
                            require(["../module/passenger/passengerResults.vue"], resolve);
                    }, 'module/passenger/passengerResults');
                    }
                },
                '/passengerDetails': {
                    name : 'passengerSearch',
                    component (resolve) {
                        require.ensure(["../module/passenger/passengerDetails.vue"], (require) => {
                            require(["../module/passenger/passengerDetails.vue"], resolve);
                    }, 'module/passenger/passengerDetails');
                    }
                },
                '/home': {
                    name : 'passengerSearch',
                    component (resolve) {
                        require.ensure(["../module/passenger/home.vue"], (require) => {
                            require(["../module/passenger/home.vue"], resolve);
                    }, 'module/passenger/home');
                    }
                }
            }

        },
        '/account' : {
            title : 'e鹿同行-个人中心',
            component (resolve) {
                require.ensure(["../module/account/index.vue"], (require) => {
                    require( ["../module/account/index.vue"],resolve );
                },'module/account/index');
            },
            subRoutes : {
                '/carInfo' : {
                    component (resolve) {
                        require.ensure(["../module/account/carInfo.vue"], (require) => {
                            require(["../module/account/carInfo.vue"], resolve);
                        }, 'module/account/carInfo');
                    }
                },
                '/userInfo' : {
                    component (resolve) {
                        require.ensure(["../module/account/userInfo.vue"], (require) => {
                            require(["../module/account/userInfo.vue"], resolve);
                        }, 'module/account/userInfo');
                    }
                },
                '/home' : {
                    component (resolve) {
                        require.ensure(["../module/account/home.vue"], (require) => {
                            require(["../module/account/home.vue"], resolve);
                        }, 'module/account/home');
                    }
                },
                '/main' : {
                    component (resolve) {
                        require.ensure(["../module/account/main.vue"], (require) => {
                            require(["../module/account/main.vue"], resolve);
                        }, 'module/account/main');
                    }
                },
                '/editUserInfo' : {
                    component (resolve) {
                        require.ensure(["../module/account/editUserInfo.vue"], (require) => {
                            require(["../module/account/editUserInfo.vue"], resolve);
                        }, 'module/account/editUserInfo');
                    }
                },
                '/myTripDriver' : {
                    component (resolve) {
                        require.ensure(["../module/account/myTripDriver.vue"], (require) => {
                            require(["../module/account/myTripDriver.vue"], resolve);
                    }, 'module/account/myTripDriver');
                    }
                },
                '/myTripDriverDetail' : {
                    component (resolve) {
                        require.ensure(["../module/account/myTripDriverDetail.vue"], (require) => {
                            require(["../module/account/myTripDriverDetail.vue"], resolve);
                    }, 'module/account/myTripDriverDetail');
                    }
                },
                '/myTripPassenger' : {
                    component (resolve) {
                        require.ensure(["../module/account/myTripPassenger.vue"], (require) => {
                            require(["../module/account/myTripPassenger.vue"], resolve);
                    }, 'module/account/myTripDriver');
                    }
                },
                '/myTripPassengerDetail' : {
                    component (resolve) {
                        require.ensure(["../module/account/myTripPassengerDetail.vue"], (require) => {
                            require(["../module/account/myTripPassengerDetail.vue"], resolve);
                    }, 'module/account/myTripPassengerDetail');
                    }
                },
                '/system' : {
                    component (resolve) {
                        require.ensure(["../module/account/system.vue"], (require) => {
                            require(["../module/account/system.vue"], resolve);
                    }, 'module/account/system');
                    }
                },
                '/agreement' : {
                    component (resolve) {
                        require.ensure(["../module/account/agreement.vue"], (require) => {
                            require(["../module/account/agreement.vue"], resolve);
                    }, 'module/account/agreement');
                    }
                },
                '/about' : {
                    component (resolve) {
                        require.ensure(["../module/account/about.vue"], (require) => {
                            require(["../module/account/about.vue"], resolve);
                    }, 'module/account/about');
                    }
                }
            }
        },
        '/address' : {
            component (resolve) {
                require.ensure(["../module/common/address.vue"], (require) => {
                    require( ["../module/common/address.vue"],resolve );
                },'module/common/addres');
            }
        },
        '/carType' : {
            component (resolve) {
                require.ensure(["../module/common/carType.vue"], (require) => {
                    require( ["../module/common/carType.vue"],resolve );
                },'module/common/carType');
            }
        }
    })
};