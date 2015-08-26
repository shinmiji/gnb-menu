/*! jquery.radioClass.js © yamoo9.net, 2015 */
;(function(global, $, undefined){
	'use strict';

	// jQuery 인스턴스 메소드인 radioClass가 정의되어 있는지 확인 후,
	// 없다면 정의
	if ( !$.fn.radioClass ) {
		$.fn.radioClass = function(user_argument) {

			/*if ( $.type(class_name) !== 'string' ) {
				throw console.error('라디오클래스를 적용할 클래스 속성 문자열을 전달해야 합니다.')
			} string 뿐만 아니라 function 도 인자로 받기 위하여 아래와 같이 수정.*/

			// 사용자 전달인자 유형 체크를 위한 변수 설정
			// $.type() 유틸리티 메소드 활용
			var _type = $.type(user_argument);

			// 전달 인자 유효성 검사
			if (_type !== 'string' && _type !== 'function') {
				console.log('유효성검사에러');
				throw console.error('라디오 클래스를 적용할 클래스 속성 문자열이거나, 함수를 전달해야 합니다.');
			}

			// _type 값이 문자일 때
			if (_type === 'string') {
				// console.log('call string');
				// 플러그인 코드 안에서 this는 jQuery 인스턴스 객체이다.
				this.addClass(class_name).siblings('.'+class_name).removeClass(class_name);
				// jQuery 체이닝을 구현하기 위한 this 반환
				return this;
			}

			// _type 값이 함수일 때
			if (_type === 'function') {
				// console.log('call function');
				// function(index, current_class){}
				var result_class = this.addClass(class_name).siblings('.'+class_name).removeClass(class_name);
				return ;
			}


			// 네이티브 코드에서의 idnex 탐색
			/*$('*').toArrya().forEach(function(itme, index){ // 네이티브는 제이쿼리와 인자의 순서가 반대여서 item, index 순서로 옴.
				console.log(item, index);
			})

			$('*').toArrya().reverse().forEach(function(itme, index){ // reverse()를 넣음으로써 index순서 변경
				console.log(item, index); 
			})

			이것을 jQuery 에서 사용하기 위해 each를 사용	
			*/
		



		}; // 플러그인 끝
	}

})(window, window.jQuery);
