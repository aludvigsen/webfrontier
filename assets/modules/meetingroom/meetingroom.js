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

        $("#userinfo").click(function(){
                scrollChatContainer.slimScroll({ scrollTo: 'bottom' });
        });


        function initScroll() {
            var totalHeight = angular.element($window).height() - msgBoxContainer.outerHeight() - chatContainer.offset().top;
            var width = scrollChatContainer.width();
            var o = {
                start: 'bottom',
                width: width + 'px',
                height: totalHeight + 'px',
                margin: 20,
                animate: false
            };
            scrollChatContainer.slimscroll(o);
        }

        angular.element( $window ).resize(function() {
            scrollChatContainer.slimscroll({destroy: true});
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
