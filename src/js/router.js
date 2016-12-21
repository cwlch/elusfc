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