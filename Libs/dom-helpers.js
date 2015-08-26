(function (global) {

	/**
	 *===========================================================
	 * dom-helpers.js 는 대상을 손쉽게 선택할 수 있는 선택자 헬퍼 함수들을 정의한 파일이다.
	 *===========================================================
	 */

	 global = global || 'window';

	/**
	 *===========================================================
	 * ★★★★★ 생성(Creating)
	 *===========================================================
	 */
	/**
	 *--------------------------------------------------------------------------
	 * ★★ 요소노드 생성 ★★
	 * createNode(elName);
	 *--------------------------------------------------------------------------
	 */
	function createEl(elName) {
		validate(isString(elName), '첫번째 인자는 문자열을 넣어주여야 합니다.');
		return document.createElement(elName);
	}
	/**
	 *--------------------------------------------------------------------------
	 * ★★ 텍스트 노드 생성 ★★
	 * createText(content);
	 *--------------------------------------------------------------------------
	 */
	function createText(content) {
		validate(isString(content), '첫번째 인자는 문자열을 넣어주여야 합니다.');
		return document.createTextNode(content);
	}

	/**
	 *===========================================================
	 * ★★★★★ 삽입(Inserting) | 이동(Moving)
	 *===========================================================
	 */

	/**
	 *--------------------------------------------------------------------------
	 * ★★ 문서(DOM)에 삽입 ★★
	 * append(parent, child); → parent로 넘어온 요소노드의 자식으로 child를 붙이는데, 가장 아래에 붙임.
	 * prepend(parent, child) → parent로 넘어온 요소노드의 첫번째 자식을 찾아서(first이용) 그 앞에 붙임.
	 * before(target,insert); →  
	 * insertBefore(insert, target);
	 *--------------------------------------------------------------------------
	 */
	function append(parent, child) {
		validate(isElement(parent) && (isElement(child) || isTextNode(child)), '전달인자는 모두 DOM 요소노드 이여야 합니다.');
		parent.appendChild(child);
	}

	function prepend(parent, child) {
		validate(isElement(parent) && (isElement(child) || isTextNode(child)), '전달인자는 모두 DOM 요소노드 이여야 합니다.');
		// 부모의 첫번째 자식을 찾아 그 앞에 삽입한다.
		var firstEl = first(parent, '*');
		if (firstEl.length === 0) {
			append(parent,child);
		} else {
			before(firstEl, child);
		}
	}

	function before(target, insert) {
		parent(target).insertBefore(insert, target); // insertBefore: target 앞에 insert를 넣어줌.
		return insert;
	}

	function insertBefore(insert, target) {
		return before(target, insert);
	}

	/**
	 *--------------------------------------------------------------------------
	 * ★★ wrap() 함수 ★★
	 *--------------------------------------------------------------------------
	 */
	function wrap (searchEl, createEl) {
		var search_el = $('.'+searchEl);
		console.log(search_el);
	}



	/**
	 *===========================================================
	 * ★★★★★ 선택(Selecting) | 탐색(Traversing)
	 *===========================================================
	 */
	$('body');

	/**
	 *----------------------------------------------------------------------------------------------------------
	 * ★★ $(selector)함수 ★★
	 * CSS 선택자를 활용하여 문서 객체를 선택하는데 도움을 주는 함수.
	 * 즉, 대상을 손쉽게 선택할 수 있는 선택자 헬퍼 함수.
	 * @param  {[string]} selector [CSS 선택자 표현식]
	 * @return {[Node|NodeList]}   [문서객체, 객체집합을 반환]
	 *----------------------------------------------------------------------------------------------------------
	 */
	/**
	 *----------------------------------------------------------------------------------------------------------
	 * 처음 작성하였던 $(selector) 함수
	 
	  function $(selector) {

		// 함수 내부 지역 변수 nodeList에 document.querySelectorAll() 방법을 사용하여
		// 전달받은 인자(매개변수) selector에 해당되는 DOM 객체를 찾아서 참조합니다.
		// 그리고 수집된 대상(노드리스트)의 개수를 파악하여 nodeList_length 변수에 참조합니다.
		var nodeList = document.querySelectorAll(selector);
		var nodeList_length = nodeList.length;

		// 만약 nodeList_length 변수가 참조하고 있는 값이 1이라면...
		if(nodeList_length === 1) {
			// 수집된 nodeList의 첫번째 인덱스에 해당되는 요소를 반환합니다.
			return nodeList[0];
		}
		// 위 조건이 거짓이라면 수집된 nodeList를 그대로 반환합니다.
		return nodeList;
	}

	 *----------------------------------------------------------------------------------------------------------
	 */
	/**
	 *----------------------------------------------------------------------------------------------------------
	 * ★★ $(selector) 함수 계량하기 ★★
	 *----------------------------------------------------------------------------------------------------------
	 */
	function $(selector, context) {

		// → 함수의 인자값에 대한 유효성 검사
		// 1) 첫번째 인자(argument)는 문자열 인가?
		// 2) 두번째 인자는 DOM 객체(=요소노드, 1, nodeName)인가 ?

		/*-----------------------------------------------------------------------------------------------------------------
		if (!isString(selector)) {
			// throw new TypeError('message'); 라고 해주어도 되지만, 실무에서는 아래와 같이 많이 사용된다.
			console.error('첫 번째 전달 인자는 문자열 이어야 합니다.');
			return; //함수 종료
		}
		// nodeType을 사용할 때 앞에 값이 undefined 이거나 list 형태일 경우에는 에러가 발생하게 된다.
		if (typeof context !== 'undefined' && isElement(context)) {
			console.error('두 번째 전달 인자는 DOM 객체 이어야 합니다.');
			return; //함수 종료
		}

		위 두개의 if문을 함수로 만들어 사용한다면 다음과 같다.
		--------------------------------------------------------------------------------------------------------------------*/

		validate( isString(selector), '첫 번째 전달 인자는 문자열 이어야 합니다.');
		validate ( context && isElement(context), '두 번째 전달 인자는 DOM 객체 이어야 합니다.');

		// 또는.. 아래와 같이 작성 가능
		/*-----------------------------------------------------------------------------------------------------------------
		if (context && context.nodeType !== 1) {
			console.error('두 번째 전달 인자는 DOM 객체 이어야 합니다.');
		}
		--------------------------------------------------------------------------------------------------------------------*/

		/*-----------------------------------------------------------------------------------------------------------------
		if (!context) {
			context = document;
		}
		--------------------------------------------------------------------------------------------------------------------*/
		// 위와 같이 작성해 주어서 만약, context가 null일 경우 document를 context 변수에 넣어 주는 작업을 해 주어도 되지만, 
		// 아래와 같이 context||document 를 이용하여 간단히 코딩해 준다.
		

		var nodeList = (context||document).querySelectorAll(selector);
		var nodeList_length = nodeList.length;

		if(nodeList_length === 1) {
			return nodeList[0];
		}
		return nodeList;
	}

	/**
	 *----------------------------------------------------------------------------------------------------------
	 * ★★ find() 함수 ★★
	 * parentEl 아래에 있는 childSelector에 해당하는  자손들을 검색
	 * 즉, 어떤 요소의 자손들을 검색하는데, 자식이 아니라 자손을 검색.
	 * childSelector에는 요소노드, class, id 모두 가능.
	 *----------------------------------------------------------------------------------------------------------
	 */
	function find(parentEl, childSelector) {
		var children     = parentEl.querySelectorAll(childSelector),
	     	   children_len = children.length;
		
		if (children_len === 0) {
			return null;
		} else if (children_len === 1) {
			return children[0];
		} else {
			return children;
		}
	}

	/**
	 *----------------------------------------------------------------------------------------------------------
	 * ★★ children() 함수 ★★
	 * parentEl 의 자식들 중 childrenSelector 에 해당하는 자식을 검색.
	 * 즉, 어떤 요소의 자식들을 검색하는데, 자손이 아니라 자식을 검색.
	 * childSelector에는 요소노드, class, id 모두 가능.
	 *----------------------------------------------------------------------------------------------------------
	 */
	function children (parentEl, childrenSelector) {
		var childEl = find(parentEl, childrenSelector);
		var childEl_length = childEl ?  childEl.length : null;
		var elSet = []; // 배열
		if (!childEl_length) {
			return childEl;
		}
		while (childEl_length--) {
			var el = childEl[childEl_length];
			if (parentEl === el.parentNode) {
				elSet.push(el);	// 배열 내부에 원소를 수집 (Collection)
			}
		}

		return elSet.length === 0 ? null : elSet.length === 1 ? elSet[0] : elSet;
	}

	/**
	 *--------------------------------------------------------------------------
	 * ★★ last(parentNode, css_selector) 함수 ★★ 
	 * parentNode 중에서 css_selector을 검색하는데, 그중에서 가장 마지막에 있는 노드 검색
	 *--------------------------------------------------------------------------
	 */
	function last(parent, css_selector) {
		var childs = find(parent, css_selector);
		var childs_length = childs.length;

		return childs[childs_length-1];
	}

	/**
	 *--------------------------------------------------------------------------
	 * ★★  next()함수: 다음 형제 요소노드 반환 ★★ 
	 * ★★  prev()함수: 이전 형제 요소노드 반환 ★★  
	 *--------------------------------------------------------------------------
	 */
	function prev(el) {
		//유효성 검사
		validate(isElement(el), 'DOM 요소노드를 전달해야 합니다.');
		//IE 9 이상 브라우저 신 기능 지원 유무 확인 후 대상 반환
		if (el.previousElementSibling) {
			return el.previousElementSibling;
		}
		//IE 8 이하 브라우저에서 적용 가능한 크로스 브라우징 기능 구현
		do {
			el = el.previousSibling;	//el에다가 el의 형제 노드 중 바로 앞 노드를 반환하는 previousSibling 을 이용하여 노드를 담음.
		} while ( el && el.nodeType !== 1);	//근데 그게 null 이면 null 을 리턴하고, null은 아닌데&&요소노드가 아니면 다시 previousSibling을 이용하여 다시 하나 앞 노드를 담음. 이걸 반복!
		return el;
	}

	function next(el) {
		//유효성 검사
		validate(isElement(el), 'DOM 요소노드를 전달해야 합니다.');
		//IE 9 이상 브라우저 신 기능 지원 유무 확인 후 대상 반환
		if (el.nextElementSibling) {
			return el.nextElementSibling;
		}
		//IE 8 이하 브라우저에서 적용 가능한 크로스 브라우징 기능 구현
		do {
			el = el.nextSibling;
		} while ( el && el.nodeType !== 1);
		return el;
	}

	/**
	 *--------------------------------------------------------------------------
	 * ★★ parent() 함수 ★★
	 * 전달된 요소노드 인자의 부모요소노드를 반환
	 * parent(el, upper)
	 *--------------------------------------------------------------------------
	 */
	function parent(el, upper) {

		validate(isElement(el), '첫번째 전달인자는 DOM 요소노드를 전달해야 합니다.');
		upper = upper || 1;
		validate(isNumber(upper), '두번째 전달인자는 숫자를 전달해야 합니다.');
		/*do {
			el = el.parentNode;
		} while (--upper);*/

		while (upper--) {
			el = el.parentNode;
			if (el === null ) {
				return null;
			}
		}

		/*for (var i=0 ; i < upper ; i++) {
			el = el.parentNode
		}*/

		return el.nodeType === 1 ? el : null; // 요소노드의 경우 nodeType은 1 이므로!
	}

	/**
	 *--------------------------------------------------------------------------
	 * ★★ first(parentNOde, selector) 함수 ★★ 
	 * parentNode 중에서 selector 검색하는데, 그중에서 가장 첫번째 있는 노드 검색
	 * selector 부분에 * 이 들어가도 가능하다.
	 *--------------------------------------------------------------------------
	 */
	function first(parent, selector) {
		var firstEl = $(selector, parent);
		return firstEl.length > 0 ? firstEl[0] : firstEl;
	}





	/**
	 *===========================================================
	 * ★★★★★ 조작(Manipulation)
	 *===========================================================
	 */


	/**
	 *----------------------------------------------------------------------------------------------------------
	 *★★ hasClass()함수 ★★
	 * 첫번째 인자에 해당하는 것에 두번째 인자에 해당하는 class이름이 속해있는지 판단하여 boolean 리턴
	 *----------------------------------------------------------------------------------------------------------
	 */
	function hasClass(el, className) {
		validate( isElement(el),  '첫 번째 전달 인자 값은 DOM 요소노드 이여야 합니다.');
		validate( isString(className), '두 번째 전달 인자 값은 문자 이여야 합니다.');

		var classList = attr(el, 'class');
		classList = (classList || '').split(' ');


		for (var i = _classList.length-1 ; i > -1; i--) {
			if ( _classList[i] === className) {
				return true;
			}
		}
		return false;
	}


	/**
	 *----------------------------------------------------------------------------------------------------------
	 * ★★ addClass() 함수 ★★
	 * addClass(el, className)
	 * el 요소노드의 class 이름에  className이라는 문자를 넣어준다.
	 * 중복된 class 이름이 존재한다면 넣지 않는다. 
	 *----------------------------------------------------------------------------------------------------------
	 */
	function addClass(el, className) {
		validate( isElement(el),  '첫 번째 전달 인자 값은 DOM 요소노드 이여야 합니다.');
		validate( isString(className), '두 번째 전달 인자 값은 문자 이여야 합니다.');

		if (!hasClass(el, className)) {
			var oldClasses = el.getAttribute('class')||'';
			el.setAttribute('class',(oldClasses + ' ' + className).trim());
		}
	}
	/**
	 *----------------------------------------------------------------------------------------------------------
	 * ★★ removeClass() 함수 ★★
	 * removeClass(el, className)
	 * el 요소노드의 class 이름에서 className과 같은 class 이름이 있다면 ,그 class 이름을 삭제한다.
	 *----------------------------------------------------------------------------------------------------------
	 */
	function removeClass(el, className) {
		validate( isElement(el),  '첫 번째 전달 인자 값은 DOM 요소노드 이여야 합니다.');
		validate( isString(className), '두 번째 전달 인자 값은 문자 이여야 합니다.');

		if (hasClass(el, className)) {
			var changeValue = attr(el, 'class').replace(className, ' ').trim();
			attr(el, 'class', changeValue);
		}

	}

	/**
	 *----------------------------------------------------------------------------------------------------------
	 * ★★ toggleClass() ★★
	 * toggleClass(el, className)
	 * el 요소노드의 class 이름에 className에 해당하는 class 이름이 있다면 없애주고,
	 * 없다면 넣어준다.
	 *----------------------------------------------------------------------------------------------------------
	 */
	function toggleClass(el, className) {
		/*if (hasClass(el, className)) {
			removeClass(el, className);
		} else {
			addClass(el, className);
		}
		위의 코드를 한줄로 바꾸면 아래와 같다.
		*/
		hasClass(el, className) ? removeClass(el, className) : addClass(el, className);
	}
	/**
	 *----------------------------------------------------------------------------------------------------------
	 * ★★ radioClass() ★★
	 * radioClass(el, className)
	 * el 요소노드의 형제 노드들 중에 class 이름에 className이 있다면 삭제하고, el 요소노드의 class이름에 className을 추가해 준다.
	 *----------------------------------------------------------------------------------------------------------
	 */
	function radioClass(el, className) {
		var parent = el.parentNode;
		var target = children(parent, '.'+className);

		if (target) {
			removeClass(target, className);
		}
		addClass(el, className);
	}


	/**
	 *----------------------------------------------------------------------------------------------------------
	 * ★★ attr() ★★
	 * attr(el, key)		// GET
	 * attr(el, key, value)	// SET
	 * getAttribute, setAttribute 역할을 하는 함수이다.
	 * 중복된 class 이름이 있더라도 상관없이 class이름을 추가한다.
	 *----------------------------------------------------------------------------------------------------------
	 */
	function attr (el, prop, value) {
		validate(isElement(el), '첫 번째 인자는 요소 노드이여야 한다.');
		// validate(isString(key), '두 번째 인자는 문자 이여야 한다.');

		if( isObject(prop) ) {
			each( prop, function(key, value) {
				el.setAttribute(key, value);
			} );
		} else if( !value && value !== '' ) {
			return el.getAttribute(prop);
		} else {
			el.setAttribute(prop, value);
		}

	}


	/**
	 *----------------------------------------------------------------------------------------------------------
	 * ★★ getStyle (설정된 스타일 속성) 함수 ★★
	 * ★★ setStyle (설정된 스타일 속성) 함수 ★★
	 * el은 돔 객체를 던지고 prop는 속성을 던진다. 
	 * $('.a') 라고 el 자리에 적어주면은 문서내에서 클래스 이름이 a인 아이를 찾아와라.
	 * 객체를 가져올 때 .으로 가져와도 되고, []으로 가져와도 되지만, .으로 가져올 경우에는 변수를 사용 못한다.
	 * 무슨이야기냐면..... 함수 내에서 a.name 으로 가져올 때 name 자리에 매개변수 사용 못한다는거야! 
	 *----------------------------------------------------------------------------------------------------------
	 */

	/*function getStyle (el, prop) {
		// 유효성 검사
		validate(isElement(el), '첫번째 인자는 요소노드 이여야 합니다.');
		validate(isString(prop), '두번째 인자는 문자열 이여야 합니다.');
		// W3C 표준방식으로, IE 9 이상 지원하면 if 문 실행
		if (window.getComputedStyle) {
			return window.getComputedStyle(el)[prop];
		} else { // MS전용 비표준 속성으로, IE8이하일 경우 else 문 실행
			return el.currentStyle[prop];
		}
	}*/
	// 그런데, getStyle 같은 경우는 프로그램이 실행될 경우 무조건 실행되어도 되므로 다음과 같이 코드를 변경해 준다.
	if (window.getComputedStyle) {
		// W3C 표준방식으로, IE 9 이상 지원하면 if 문 실행
		getStyle = function (el, prop) {
			validate(isElement(el), '첫번째 인자는 요소노드 이여야 합니다.');
			validate(isString(prop), '두번째 인자는 문자열 이여야 합니다.');
			return window.getComputedStyle(el)[prop];	
		}
		
	} else {
		// MS전용 비표준 속성으로, IE8이하일 경우 else 문 실행
		getStyle = function (el, prop) {
			validate(isElement(el), '첫번째 인자는 요소노드 이여야 합니다.');
			validate(isString(prop), '두번째 인자는 문자열 이여야 합니다.');
			return el.currentStyle[prop];	
		}
	}

	/*function setStyle(el, prop, value) {
		validate(isElement(el), '첫번째 인자는 요소노드 이여야 합니다.');
		validate(isString(prop), '두번째 인자는 문자열 이여야 합니다.');
		el.style[prop] = value;
	}*/

	// 위의 setStyle 함수를 확장시켜보자..
	function setStyle (el, prop, value) {
		validate(isElement(el), '첫번째 인자는 요소노드 이여야 합니다.');
		validate(isString(prop), '두번째 인자는 문자열 이여야 합니다.');
		//prop에 객체 형태로 들어왔는지를 판단하기 위해 match를 이용하여 :존재 여부 검사
		
		if (prop.match(':')) {
			el.style.cssText = prop;	
		} else {
			el.style[prop] = value;
		}
	}

	// 위의 getStyle함수와 setStyle 함수를 합쳐서 더욱 간편하게 사용할 수 있도록 함수를 확장시켜 보자.
	function css (el, prop, value) {
		validate(isElement(el), '첫번째 인자는 요소노드 이여야 합니다.');
		validate(isString(prop), '두번째 인자는 문자열 이여야 합니다.');

		if (value || prop.match(':')) {
			// SET
			setStyle(el, prop, value);
		} else {
			return getStyle(el, prop);
		}
	}

	/**
	 *--------------------------------------------------------------------------
	 * text() 함수
	 *--------------------------------------------------------------------------
	 */
	
	function text(parent, content) {
		var method = parent.textContent ? 'textContent' : 'innerText';
		parent[method] = content; //method 라는 변수를 가져다 사용하기 위해 parent.method 가 아닌 parent[method]라고 해준다.
	}
	


	/**
	 *===========================================================
	 * ★★★★★ 유틸리티(Utility)
	 *===========================================================
	 */

	/**
	 *----------------------------------------------------------------------------------------------------------
	 * ★★ checkCSS3Feature 함수 (CSS3 신기능을 검수하는 헬퍼 함수) ★★
	 * 사용자의 웹 브라우저에서 새로운 CSS3 속성을 지원하는지 검사하여 그 결과를 <html> 요소의 class 속성 값으로 추가
	 *----------------------------------------------------------------------------------------------------------
	 */
	function checkCSS3Feature (feature) {
		var html = $('html');
		if (feature in $('body').style) { //$('body').style 객체 안에 fearure이 있는가?
			var html_old_class = html.getAttribute('class');
			html.setAttribute('class', html_old_class + ' ' + feature);
		} else {
			var html_old_class = html.getAttribute('class');
			html.setAttribute('class', html_old_class + ' ' + 'no-'+feature);
		}
	}

	/**
	 *----------------------------------------------------------------------------------------------------------
	 * ★★ checkUserAgent(device_name) 함수 ★★
	 * 브라우저 식별자로 대상을 구분하는 헬퍼함수
	 *----------------------------------------------------------------------------------------------------------
	 */
	function checkUserAgent(device_name, class_name) {
		var userAgent = window.navigator.userAgent.toLowerCase();
		var html = $('html');
		class_name == class_name || device_name;
		if (userAgent.indexOf(device_name) > -1) {
			addClass(html, class_name);
		}
	}


	/**
	 *----------------------------------------------------------------------------------------------------------
	 * ★★ 유효성 검사 헬퍼 함수 ★★
	 * is()
	 * isNumber()
	 * isString()
	 * isBoolean()
	 * isFunction()
	 * isArray()
	 * isObject()
	 *----------------------------------------------------------------------------------------------------------
	 */
	/*
	function is(data, type) {

		validate(isString(type), '두번째 인자 값은 문자열을 사용해야 합니다.');

		switch( data.constructor ) {
			case Number:
				return type === 'number' || type === 'num';
			break;
			case String:
				return type === 'string' || type === 'str';
			break;
			case Boolean:
				return type === 'boolean' || type === 'boo';
			break;
			case Function:
				return type === 'function' || type === 'fnc';
			break;
			case Array:
				return type === 'array' || type === 'arr';
			break;
			case Object:
				return type === 'object' || type === 'obj';
		}

	}

	function isNumber(num) {
		return typeof num === 'number';
	}

	function isString(str) {
		return typeof str === 'string';
	}

	function isBoolean(boo) {
		return typeof boo === 'boolean';
	}

	function isFunction(fnc) {
		return typeof fnc === 'function';
	}

	function isArray(arr) {
		return !isObject(arr);
	}

	function isObject(obj) {
		return typeof obj === 'object' && !obj.push;
	}*/

	function is (data, type) { //date는 타입이 type과 일치하는가?
		try {
			/*validate(data, '첫 번째 인자 값은 확인하고자 하는 데이터 값을 입력해 주세요.');
			validate(isString(type), '두 번째 인자 값은 문자열을 입력해 주세요.');*/

			switch (data.constructor) {
				case Number:
					return type === 'number' || type === 'num';
					break;
				case String:
					return type === 'string' || type === 'str';
					break;
				case Boolean:
					return type === 'boolean' || type === 'boo';
					break;
				case Function:
					return type === 'function' || type === 'fnc';
					break;
				case Array:
					return type === 'array' || type === 'arr';
					break;
				case Object:
					return type === 'object' || type === 'obj';
					break;
			} 
		} catch(e) {
			console.error(e.name, ': ', e.message);
		}
	}

	function isNumber (num) {
		return typeof num === 'number';
	}
	function isString(str) {
		return typeof str === 'string';
	}
	function isBoolean (boo) {
		return typeof boo === 'boolean';
	}
	function isFunction (fnc) {
		return typeof fnc === 'function';
	}
	function isArray (arr) {
		// return !isObject(arr);
		if (!arr) {return false;}
		return arr.constructor === 'Array';
	}
	function isObject (obj) {
		// return typeof obj === 'object' && !obj.push;
		/* return typeof obj === 'object' && !obj.length; 라고 해주면 마음데로 형 변환을 하기 때문에 오류를 발생시킬 수 있다.*/
		if (!obj) {return false;}
		return obj.constructor === 'Object';
	}

	/**
	 *----------------------------------------------------------------------------------------------------------
	 * ★★ isElement 헬퍼 함수 ★★
	 * 요소노드인지 파악하는 함수
	 *----------------------------------------------------------------------------------------------------------
	 */
	function isElement(el) {
		return el ? el.nodeType === 1 : false;
	}

	function isTextNode(txt) {
		return txt ? txt.nodeList === 3 : false;
	}

	/**
	 *----------------------------------------------------------------------------------------------------------
	 * ★★ isNodeList 헬퍼 함수 ★★
	 * 노드리스트인지 파악하는 함수
	 *----------------------------------------------------------------------------------------------------------
	 */
	function isNodeList(list) {
		return !!(list && list.length > 0 && list.item);//!!는 형을 true 또는 false로 변환시켜 준다.
		//return boolean(list && list.length > 0 && list.item); 이라고 써도 동일하다.
	}


	/**
	 *----------------------------------------------------------------------------------------------------------
	 * ★★ validate() 헬퍼 함수 ★★
	 * validate(조건, 오류메세지)
	 *----------------------------------------------------------------------------------------------------------
	 */
	function validate(condition, error_msg) {
		if(
			condition === undefined &&
			condition === null &&
			condition !== 0 &&
			condition !== ''
		) {
			throw new TypeError(error_msg);
		}
	}

	/**
	 *--------------------------------------------------------------------------
	 * ★★ override() 함수 ★★
	 * override(obj1, obj2)
	 * 객체 A에 객체 B의 멤버를 복제
	 * 동일한 멤버가 있을 경우 덮어씀(Override)
	 *--------------------------------------------------------------------------
	 */
	function override(obj1, obj2) {
		for(var key in obj2) {
			obj1[key] = obj2[key];
		}
		return obj1;
	}



	/**
	 *--------------------------------------------------------------------------
	 * ★★ 자바스크립트 위임(Delegation) ★★ 
	 * 다른 객체(Array)의 멤버(push)를 위임해서 가져다가 유사배열 (arguments 또는 NOdeList)에 사용할 수 있다.
	 *--------------------------------------------------------------------------
	 */
	function makeArray(pseudo_arr) {
		validate(pseudo_arr.length, '유사배열 또는 문자열을 인자로 설정해 주세요.');
		if (pseudo_arr.length === undefined) {
			return;
		}
		// return Array.prototype.slice.call(pseudo_arr); 이라고 하거나 아래처럼 해주면 된다.
		return [].slice.call(pseudo_arr);
	}

	/**
	 *--------------------------------------------------------------------------
	 * ★★ each 함수 ★★
	 * 대상을 한번에 여러개를 던진 후(= 배열로 던진 후) 그 대상에 각각 function을 실행.
	 *--------------------------------------------------------------------------
	 */
	var each;

	if (Array.prototype.forEach) {
		each = function(data, fn) {
			data.forEach(fn);
		};
	} else {
		each = function(data, fn) {
			validate(isArray(data),'첫번째 전달 인자는 배열이여야 합니다.');
			validate(isFunction(fn), '두번째 전달인자는 함수이여야 합니다.');
			 for (var i = 0, l = data.length; i < l; i++) {
			 	var item = data[i];
			 	var index = i;

			 	fn.call(null, item, index, data);
			 }
		};
	}
	/*each([1,2,3,true],function(){console.log(arguments)}); 전달받은 인자들은 arguments 유사배열에 담기기 때문에 이를 이용하여 출력해 볼 수 있다. 그리고 arguments[0]이 item이 되고, arguments[1]은 index, arguments[2]는 data값이 출력되게 된다.*/

	/*context.$ = $;
	context.makeArray = makeArray; //우측 makeArray의 경우는 지역함수이고, 그걸 window에서 사용할 수 있도록 담아주는 작업.
	이렇게 작성하거나 아래처럼 해도 됨.
	

	var openAPI = {
		$:$,
		css:css,
		makeArray:makeArray,
		addClass:addClass
	}
	override(yamoo9,openAPI);*/

	// 외부에서 접근가능한 객체 설정
	global.kipfa = {

		// 생성(Creating)
		createEl         : createEl,
		createText       : createText,

		// 삽입(Inserting) 또는 이동(Moving)
		append           : append,
		prepend	: prepend,
		before           : before,
		insertBefore     : insertBefore,

		// 선택(Selecting) | 탐색(Traversing)
		$                : $,
		find             : find,
		children         : children,
		first            : first,
		last             : last,
		prev             : prev,
		next             : next,
		parent           : parent,

		// 조작(Manipulation)
		getStyle     : getStyle,
		setStyle     : setStyle,
		css              : css,
		attr             : attr,
		hasClass         : hasClass,
		addClass         : addClass,
		removeClass      : removeClass,
		toggleClass      : toggleClass,
		radioClass       : radioClass,
		text   : text,

		// 감지(Detection)
		checkCSS3Feature : checkCSS3Feature,
		checkUserAgent   : checkUserAgent,

		// 유틸리티(Utility)
		validate         : validate,
		isNumber         : isNumber,
		isString         : isString,
		isBoolean        : isBoolean,
		isFunction       : isFunction,
		isArray          : isArray,
		isObject         : isObject,
		isElement        : isElement,
		isTextNode	: isTextNode,
		isNodeList       : isNodeList,
		each             : each,
		makeArray        : makeArray,
		override         : override,

	};

})(window);