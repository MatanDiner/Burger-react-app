import reducer from './auth';
import * as actionType from '../actions/actionType';

describe('auth reducer',()=>{

    it('should return the initial state',()=>{
        expect(reducer(undefined,{})).toEqual({
            token:null,
            userId:null,
            error:null,
            loading:false,
            authRedirectPath:'/'
        });
    });


    it('should store the token upon login',()=>{
        expect(reducer({
            token:null,
            userId:null,
            error:null,
            loading:false,
            authRedirectPath:'/'
        },{
            type:actionType.AUTH_SUCCESS,
            idToken : 'token',
            userId:'userId'
        })).toEqual({
            token:'token',
            userId:'userId',
            error:null,
            loading:false,
            authRedirectPath:'/'
        })
    }) 


});