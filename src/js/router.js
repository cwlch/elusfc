/**
 * Created by Ch on 16/12/18.
 */

export default (route) => {
    route.map({
        '/driver' : {
            title : '司机端',
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
                }
            }
        },
        '/passenger' : {
            title : '乘客端',
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
                }
            }

        },
        '/account' : {
            title : '个人中心',
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