angular.module('meetingroom', ['sun.scrollable'])
    .controller('meetingroomController', function($scope, $window, $timeout){

        $scope.messages = [{
            user: "Andreas Ludvigsen",
            img: "http://placehold.it/60x60",
            timestamp: new Date(),
            text: ["This is a paragraph", "And this is another"]
        },{
            user: "Andreas Ludvigsen",
            img: "http://placehold.it/60x60",
            timestamp: new Date(),
            text: ["This is a paragraph", "And this is another"]
        },{
            user: "Andreas Ludvigsen",
            img: "http://placehold.it/60x60",
            timestamp: new Date(),
            text: ["This is a paragraph", "And this is another"]
        },{
            user: "Andreas Ludvigsen",
            img: "http://placehold.it/60x60",
            timestamp: new Date(),
            text: ["This is a paragraph", "And this is another"]
        },{
            user: "Andreas Ludvigsen",
            img: "http://placehold.it/60x60",
            timestamp: new Date(),
            text: ["This is a paragraph", "And this is another"]
        },{
            user: "Andreas Ludvigsen",
            img: "http://placehold.it/60x60",
            timestamp: new Date(),
            text: ["This is a paragraph", "And this is another"]
        },{
            user: "Andreas Ludvigsen",
            img: "http://placehold.it/60x60",
            timestamp: new Date(),
            text: ["This is a paragraph", "And this is another"]
        },{
            user: "Andreas Ludvigsen",
            img: "http://placehold.it/60x60",
            timestamp: new Date(),
            text: ["This is a paragraph", "And this is another"]
        },{
            user: "Andreas Ludvigsen",
            img: "http://placehold.it/60x60",
            timestamp: new Date(),
            text: ["This is a paragraph", "And this is another"]
        }];

        var msgBoxContainer = $("#messageBoxContainer");
        var chatContainer = $("#chat");
        var scrollChatContainer = $(".nano");


        function initScroll() {
            var toTop = chatContainer.offset().top;
            var msgBox = msgBoxContainer.outerHeight();
            var windowSize = angular.element($window).height();
            var totalHeight = windowSize - msgBox - toTop;
            scrollChatContainer.height(totalHeight);
        }

        angular.element( $window ).resize(function() {
            initScroll();
        });

        $timeout(function(){
            initScroll();
        }, 100);



    });
