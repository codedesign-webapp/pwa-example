// 외부 공유할 상수
const conHello = '안녕하세요!';
// 외부 공유할 함수
const fnPlusNumbers = (pNum1, pNum2) => pNum1 + pNum2;


// Named Export로 외부에서 함수들을 사용할 수 있도록 내보냄
export { conHello, fnPlusNumbers };
