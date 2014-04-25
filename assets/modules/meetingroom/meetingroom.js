angular.module('meetingroom', [])
    .directive('wfEnter', function () {
        return {
            scope: {
                wfEnter: '&'
            },
            link: function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if(event.which === 13  && !event.shiftKey) {
                        scope.$apply(function (){
                            scope.wfEnter();
                        });

                        event.preventDefault();
                    }
                });
            }
        };
    })
    .controller('meetingroomController', function($scope, $window, $timeout){


        $scope.user = {
            name: "Andreas Ludvigsen",
            img: "http://placehold.it/60x60"
        };

        $scope.messages = [{
            user: $scope.user,
            timestamp: new Date(),
            text: ["This is a paragraph", "And this is another"]
        },{
            user: $scope.user,
            timestamp: new Date(),
            text: ["This is a paragraph", "And this is another"]
        },{
            user: $scope.user,
            timestamp: new Date(),
            text: ["This is a paragraph", "And this is another"]
        },{
            user: $scope.user,
            timestamp: new Date(),
            text: ["This is a paragraph", "And this is another"]
        },{
            user: $scope.user,
            timestamp: new Date(),
            text: ["This is a paragraph", "And this is another"]
        },{
            user: $scope.user,
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

        var msgBoxContainer = $("#messageBoxContainer");
        var chatContainer = $("#chat");
        var scrollChatContainer = $scope.scrollChatContainer = $("#myslimscroll");


        $scope.sendMessage = function () {
            if($scope.messageText === ""){
                return;
            }
            var paragraphs = $scope.messageText.split("\n");
            $scope.messages.push({
                user: $scope.user,
                timestamp: new Date(),
                text: paragraphs
            });
            $scope.messageText = "";

            $timeout(function (){
                scrollChatContainer.slimScroll({scrollTo: "bottom"});
            });

        };

        function initScroll() {
            var totalHeight = angular.element($window).height() - msgBoxContainer.outerHeight() - chatContainer.offset().top;
            var o = {
                start: 'bottom',
                height: totalHeight + 'px',
                margin: 20,
                animate: false,
                scrollTo: "bottom"
            };
            scrollChatContainer.slimscroll(o);
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
