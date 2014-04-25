angular.module('meetingroom', [])
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13  && !event.shiftKey) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })
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
            text: ["Check out this link http://www.vg.no", "&nbsp;", "And this is another"]
        }
        /*,{
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
        }*/];

        $scope.runThisMofo = function () {
            var a = $("textarea").val().replace(/\n/g, "<br>");
            $("textarea").val("");
            console.log(a);
        };

        var msgBoxContainer = $("#messageBoxContainer");
        var chatContainer = $("#chat");
        var scrollChatContainer = $("#myslimscroll");


        function initScroll() {
            var topbar = chatContainer.offset().top;
            var msgBox = msgBoxContainer.outerHeight();
            var windowSize = angular.element($window).height();
            var totalHeight = windowSize - msgBox - topbar;
            var width = scrollChatContainer.width();
            scrollChatContainer.slimscroll({
                width: width + 'px',
                height: totalHeight + 'px',
                //railVisible: true,
                margin: 20,
                start: 'bottom'
            });
        }

        angular.element( $window ).resize(function() {
            initScroll();
        });

        $timeout(function(){
            initScroll();

            // Event handler for my awesome scroller
            scrollChatContainer.slimScroll().bind('slimscroll', function(e, pos){
                console.log("Reached " + pos);
            });
        }, 100);

    });
