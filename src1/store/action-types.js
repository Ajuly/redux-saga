export const INCREMENT = 'INCREMENT';
export const INCREMENT_ASYNC = 'INCREMENT_ASYNC'; 
// 异步加一 这个是给saga发的 ，saga会监听这个动作进行业务处理，处理完成后会派发真正修改状态的动作