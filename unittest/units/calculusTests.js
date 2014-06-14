'use strict';

var assert = require("assert");
var SFM = require("../../build/scripts/sfmunittest.js");
var _ = require("../../venders/underscore/underscore.js");


describe('Calculus utilities', function(){

    var linearSample = function(vars){
        var x = vars[0],
            y = vars[1];
        return 3*x + 4*y;
    };

    var nonlinearSample = function(vars){
        var x = vars[0],
            y = vars[1];
        return 3*x*x + 4*y*y + x*y;
    };

    describe('SFM.parialDerivative()', function(){

        it('successfully executed', function(){
            assert.doesNotThrow(function(){
                assert.equal(true, _.isFinite(SFM.partialDerivative(linearSample, [2,3], 0)));
                assert.equal(true, _.isFinite(SFM.partialDerivative(linearSample, [2,3], 1)));
                assert.equal(true, _.isFinite(SFM.partialDerivative(nonlinearSample, [2,3], 0)));
                assert.equal(true, _.isFinite(SFM.partialDerivative(nonlinearSample, [2,3], 1)));
            });
        });

        it('works with linear function', function(){
            var linearDelta  = SFM.partialDerivative(linearSample, [1,2], 0) - SFM.partialDerivative(linearSample, [2,2],0);
            assert.equal(true, Math.pow(linearDelta, 2)<0.01);
        });

    });

    describe('SFM.getJacobian()', function(){

        var funcs2 = [linearSample, nonlinearSample];
        var funcs3 = [linearSample, nonlinearSample, linearSample];

        it('executed without exception', function(){
            assert.doesNotThrow(function(){
                var jacob2 = SFM.getJacobian(funcs2, [2,3]);
                assert.equal(2, jacob2.rows);
                assert.equal(2, jacob2.cols);
                var jacob3 = SFM.getJacobian(funcs3, [2,3]);
                assert.equal(3, jacob3.rows);
                assert.equal(2, jacob3.cols);
            });
        });
    });

//    describe('SFM.M()', function(){
//    });

});