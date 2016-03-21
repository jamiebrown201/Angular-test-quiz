(function(){

	var app = angular.module('myQuiz', []);

	app.controller('QuizController', ['$scope', '$http', '$sce',function($scope, $http, $sce){


		$scope.score = 0;
    $scope.activeQuestion = -1;
    $scope.activeQuestionAnswered = 0;
    $scope.percentage = 0;



    $http.get('quiz_data.json').then(function(quizData){
      $scope.myQuestions = quizData.data;
      $scope.totalQuestions = $scope.myQuestions.length;
    });

		$scope.selectAnswer = function(qIndex, aIndex){
			var questionState = $scope.myQuestions[qIndex].questionState;

			if(questionState != 'answered'){
				$scope.myQuestions[qIndex].selectAnswer = aIndex;
				var correctAnswer = $scope.myQuestions[qIndex].correct;
				$scope.myQuestions[qIndex].correctAnswer = correctAnswer;
				if( aIndex === correctAnswer ){
					$scope.myQuestions[qIndex].correctness = 'correct';
					$scope.score += 1;
				}else{
					$scope.myQuestions[qIndex].correctness = 'incorrect';
				}
				$scope.myQuestions[qIndex].questionState = 'answered';
			}
			$scope.percentage = (($scope.score / $scope.totalQuestions)*100);
		};

		$scope.isSelected = function(qIndex, aIndex){
			return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
		};

		$scope.isCorrect = function(qIndex, aIndex){
			return $scope.myQuestions[qIndex].correctAnswer === aIndex;
		};

		$scope.selectContinue = function(){
			return $scope.activeQuestion += 1;
		};

		$scope.createShareLinks = function(percentage){

			// var url = 'http://google.com';

			var emailLink = '<a class="btn email" href="mailto:?subject=Try to beat my saturn quiz score!&body=I scored a '+ percentage +'% on this quiz about Saturn. Try to beat my score at '+ url +'">Email a friend</a>';

      var twitterlLink = '<a class="btn twitter" target="_blank" href="http://twitter.com/share?text=I scored a '+ percentage +'% on this quiz about Saturn. Try to beat my score at&url='+url+'&hashtags=SaturnQuiz">Tweet your score</a>';

      var newMarkup = emailLink + twitterlLink;

      return $sce.trustAsHtml(newMarkup);

		};

	}]);

})();



var num = 0;
while(num < 101){
	if(num % 3 === 0 && num % 5 === 0){
  	console.log('fizzbuzz');
  }else if(num % 3 === 0){
  	console.log('fizz');
  }else if(num % 5 === 0){
  	console.log('buzz');
  } else{
  	console.log(num);
  }
	num++;
}
