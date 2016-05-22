'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
    global Firebase
    global angular
    global jQuery
*/

var mainApp = angular.module('mainApp', ['ui.router', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'ngStorage', 'angularSmoothscroll', 'slick']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: function controller($scope, $http, $timeout) {
            $scope.setPageTitle('Home');

            $http.get('http://white2-web-dingzhengru.c9users.io:8080/products/all').success(function (data) {
                $scope.products = data;
            });

            $scope.slick = {
                dots: false,
                slidesToShow: 3,
                slidesToScroll: 3,
                centerMode: false, // default false
                centerPadding: '50px', // default: 50px
                speed: 500,
                infinite: true,
                arrows: true,
                touchMove: false,
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        dots: false,
                        arrows: true,
                        centerMode: true,
                        centerPadding: '40px',
                        touchMove: true,
                        slidesToShow: 1
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        dots: false,
                        arrows: true,
                        centerMode: true,
                        centerPadding: '40px',
                        touchMove: true,
                        slidesToShow: 1
                    }
                }]
            };

            // 分頁

            $scope.pageSum = function (items) {
                return Math.ceil(items.length / $scope.pageSize) - 1; // 無條件進位 減1是因為從0開始計算的
            };
            $scope.changePage = function (page) {
                $scope.currentPage = parseInt(page, 10);
            };
            $scope.currentPage = 0;
            $scope.pageSize = 4;

            // 分頁 ==/
            // Product
            $scope.isAnimate = false;
            $scope.productList = function () {
                return $scope.range(1, 20);
            };
            $scope.previousPage = function () {
                if ($scope.currentPage - 1 < 0) return;
                $scope.isAnimate = true;
                var element = angular.element(document.querySelector('.animate-slide'));
                element.finish().css({
                    opacity: 1
                }).animate({
                    opacity: 0
                }, { duration: 500, queue: true }).animate({
                    opacity: 1
                }, { duration: 500, queue: true });

                $timeout(function () {
                    $scope.currentPage = $scope.currentPage - 1;
                    $scope.isAnimate = false;
                }, 500);
            };
            $scope.nextPage = function () {
                if ($scope.pageSize * ($scope.currentPage + 1) >= $scope.productList().length) return;
                $scope.isAnimate = true;
                var element = angular.element(document.querySelector('.animate-slide'));
                element.finish().css({
                    opacity: 1
                }).animate({
                    opacity: 0
                }, { duration: 500, queue: true }).animate({
                    opacity: 1
                }, { duration: 500, queue: true });

                $timeout(function () {
                    $scope.isAnimate = false;
                    $scope.currentPage = $scope.currentPage + 1;
                }, 500);
            };
            // Product ==/
        }
    });
    $urlRouterProvider.otherwise('/');
})

// Pagination 分頁
.filter('pagination', function () {
    return function (items, scope) {
        var start = scope.currentPage * scope.pageSize;
        var end = (scope.currentPage + 1) * scope.pageSize;
        return items.slice(start, end);
    };
}).animation('.slide', [function () {
    return {
        enter: function enter(element, doneFn) {
            element.css({
                opacity: 0
            });
            element.animate({
                opacity: 1
            }, 1000);
            // jQuery(element).addClass('animated bounceInLeft');
        },

        move: function move(element, doneFn) {
            // jQuery(element).fadeIn(1000, doneFn);
        },

        leave: function leave(element, doneFn) {
            // let elementTop = jQuery(element).position().top - jQuery(element).height();
            console.log(jQuery(element).text());
            // jQuery(element).addClass('animated fadeOut');
            element.css({
                opacity: 1,
                display: 'block'
            }).animate({
                opacity: 0,
                display: 'none'
            }, 1000);
        }
    };
}]).controller('MainController', function ($scope, $http, $location, $uibModal) {
    $scope.setPageTitle = function (pageTitle) {
        $scope.pageTitle = pageTitle;
    };
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
    $scope.arrayObjectIndexOf = function (myArray, searchItem, property) {
        for (var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchItem[property]) return i;
        }
        return -1;
    };
    $scope.range = function (min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }return input;
    };
    $scope.isMobile = {
        Android: function Android() {
            return !!navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function BlackBerry() {
            return !!navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function iOS() {
            return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function Opera() {
            return !!navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function Windows() {
            return !!navigator.userAgent.match(/IEMobile/i) || !!navigator.userAgent.match(/WPDesktop/i);
        },
        any: function any() {
            return $scope.isMobile.Android() || $scope.isMobile.BlackBerry() || $scope.isMobile.iOS() || $scope.isMobile.Opera() || $scope.isMobile.Windows();
        }
    };
    $scope.openProductModal = function (size, _product) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/templates/modal/product-modal.html',
            controller: 'ProductModalCtrl',
            size: size,
            resolve: {
                product: function product() {
                    return _product;
                }
            }
        });

        modalInstance.result.then(function () {
            console.log('ok');
        }, function () {
            console.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.templates = {
        nav: 'templates/nav.html',
        footer: 'templates/footer.html'
    };
})

// Modal Controller

.controller('ProductModalCtrl', function ($scope, $uibModalInstance, product) {

    $scope.product = product;

    $scope.ok = function () {
        return $uibModalInstance.close([]);
    };
    $scope.cancel = function () {
        return $uibModalInstance.dismiss('cancel');
    };
});

// Modal Controller ===/

exports.default = mainApp;


angular.element(document).ready(function () {
    return angular.bootstrap(document, ['mainApp']);
});