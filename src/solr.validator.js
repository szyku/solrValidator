/*!  Version 2.0.1 | solrValidator | Copyright (c) 2015 HowardsHome | MIT License | http://www.howardshome.com/license */
/*
 *    Copyright (c) 2015 HowardsHome  (http://www.howardshome.com)
 *    MIT License
 *
 *    Permission is hereby granted, free of charge, to any person obtaining a copy
 *    of this software and associated documentation files (the "Software"), to deal
 *    in the Software without restriction, including without limitation the rights
 *    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *    copies of the Software, and to permit persons to whom the Software is
 *    furnished to do so, subject to the following conditions:
 *
 *    The above copyright notice and this permission notice shall be included in all
 *    copies or substantial portions of the Software.
 *
 *    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *    SOFTWARE.
 */

var solrValidator = function (language, mode, allowedSolrFields, maxLength, UseConsoleLog) {
    language = typeof language !== 'undefined' ? language : "nl";
    allowedSolrFields = typeof allowedSolrFields !== 'undefined' ? allowedSolrFields : null;
    mode = typeof mode !== 'undefined' ? mode : "normal";
    maxLength = typeof maxLength !== 'undefined' ? maxLength : 4000;
    UseConsoleLog = typeof UseConsoleLog !== 'undefined' ? UseConsoleLog : false;
    $.solrValidatorMessages.init(solrValidatorTranslations, language);

    this.query = null;
    this.allowedSolrFields = allowedSolrFields;
    this.mode = mode;
    this.errorMessages = null;
    this.maxLength = maxLength;
    this.queryParts = [];
    this.UseConsoleLog = UseConsoleLog;
    if (this.UseConsoleLog) {
        console.log('UseConsoleLog is set to TRUE')
    }
}

solrValidator.prototype = {
    validate: function (query) {
        query = typeof query !== 'undefined' ? query : "";
        if (query == null || query.length <= 0) {
            this.errorMessages = new Array();
            this.errorMessages.push($.solrValidatorMessages.get("EmptyQuery"));
        }

        if (query != null && query.length > 0 && query.length > this.maxLength) {
            this.errorMessages = new Array();
            this.errorMessages.push($.solrValidatorMessages.get("QueryToLong") + this.maxLength);
        }

        if (query != null && query.length > 0 && query.length <= this.maxLength) {
            this.query = query.replace(/\\./g, "\\ ");
            this.errorMessages = new Array();
            if (this.mode == "strict") {
                this.checkStrict()
            }
            if (this.mode == "normal") {
                this.checkNormal()
            }
        }


    },

    checkStrict: function () {
        if (this.UseConsoleLog) {
            console.log('using checkStrict')
        }
        // checks op gehele query
        this.checkAllowedCharacters();
        this.inValidQuotes();
        this.checkParentheses();
        this.checkSlash();
        this.checkQuotes();
        this.checkAsteriskNotAllowed();
        this.checkORInParenthesisBegin();
        this.checkORInParenthesisEnd();
        this.checkColon();
        this.checkColonAtBeginning();
        this.checkCaret();
        this.checkSquiggle();
        this.checkDoNotUseAND();
        this.checkAmpersands();
        this.checkExclamationMark();
        this.checkQuestionMarkNotAllowed();
        this.checkPlusMinus();
        this.checkDoubleOR();
        this.checkInvalidNot();
    },

    checkNormal: function () {
        if (this.UseConsoleLog) {
            console.log('using checkNormal')
        }
        this.checkNormalAllowedCharacters();
        this.inValidQuotes();
        this.checkParentheses();
        this.checkSlash();
        this.checkQuotes();
        this.checkAsterisk();
        this.checkStartingWithAWildCard();
        this.checkStartingWithANot();
        this.checkORInParenthesisBegin();
        this.checkORInParenthesisEnd();
        this.checkANDInParenthesis();
        this.checkColonAtEnd();
        this.checkColonAtBeginning();
        this.checkAllowedFields();
        this.checkCaret();
        this.checkNearSquiggle();
        this.checkAmpersands();
        this.checkExclamationMark();
        this.checkQuestionMark();
        this.checkColon();
        this.checkInvalidNot();
        this.checkDoubleOR();
        this.checkDoubleAND();
        this.checkPlusMinus();
    },

    removeValidPhrasePatterns: function (queryText) {
        var validPatterns = /((([A-Za-z]+:)|-|\+)*("[^"]*")|"[^"]*")/g;
        queryText = queryText.replace(validPatterns, "");
        return queryText.trim();
    },

    removePhrases: function (queryText) {
        var validPatterns = /"([^"]*)"/g;
        queryText = queryText.replace(validPatterns, "");
        return queryText.trim();
    },


    checkAllowedCharacters: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkAllowedCharacters", queryToCheck)
        }
        matches = queryToCheck.match(/[^a-zA-Z0-9\x80-\xFF_+\-:.()~\^\"*?&|!{}\[\]\\@#\/$%'= \r\n“”‘???’?„?”]/);
        if (matches != null && matches.length > 0) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("InvalidCharacter")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("InvalidCharacter"));
            }
        }
    },

    checkNormalAllowedCharacters: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkNormalAllowedCharacters", queryToCheck)
        }
        matches = queryToCheck.match(/[^a-zA-Z0-9\x80-\xFF_+\-:,.()~\^\"*?&|!{}\[\]\\@#\/$%'= \r\n“”‘???’?„?”]/);
        if (matches != null && matches.length > 0) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("InvalidCharacter")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("InvalidCharacter"));
            }
        }
    },

    checkDoNotUseAND: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkDoNotUseAND", queryToCheck)
        }
        matches = queryToCheck.match(/^AND(\s{1})|(\s{1})AND(\s{1})|(\s{1})AND$/);
        if (matches != null) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("DoNotUseAnd")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("DoNotUseAnd"));
            }
        }
    },

    inValidQuotes: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("inValidQuotes", queryToCheck)
        }
        matches = queryToCheck.match(/[“”‘???’?„?”]/);
        if (matches != null && matches.length > 0) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("InvalidQuotes")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("InvalidQuotes"));
            }
        }
    },

    checkAsterisk: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkAsterisk (1)", queryToCheck)
        }
        // remove paterns that are valid
        queryToCheck = this.removeValidPhrasePatterns(queryToCheck);
        if (this.UseConsoleLog) {
            console.log("checkAsterisk (2)", queryToCheck)
        }
        // check remaining query
        if (queryToCheck.trim() != "") {
            matches = queryToCheck.match(/^[\*]*$|[\s]\*|^\*[^\s]/);
            if (matches != null) {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("InvalidWildCardUsage")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("InvalidWildCardUsage"));
                }
            }
        }
    },

    checkAsteriskNotAllowed: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkAsteriskNotAllowed", queryToCheck)
        }
        matches = queryToCheck.match(/\*/);
        if (matches != null) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("NoWildCardUsage")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("NoWildCardUsage"));
            }
        }
    },

    checkStartingWithAWildCard: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkStartingWithAWildCard (1)", queryToCheck)
        }
        // remove paterns that are valid
        queryToCheck = this.removeValidPhrasePatterns(queryToCheck);
        if (this.UseConsoleLog) {
            console.log("checkStartingWithAWildCard (2)", queryToCheck)
        }
        // check remaining query
        if (queryToCheck != "") {
            matches = queryToCheck.match(/(\s{1,})[*|\?][a-zA-Z0-9\x80-\xFF_+\-:.()~\^\"*?&|!{}\[\]\\@#\/$%'= \r\n“”‘???’?„?”]|^[*|\?][a-zA-Z0-9\x80-\xFF_+\-:.()~\^\"*?&|!{}\[\]\\@#\/$%'= \r\n“”‘???’?„?”]|(:|[(])[*|\?][a-zA-Z0-9\x80-\xFF_+\-:.()~\^\"*?&|!{}\[\]\\@#\/$%'= \r\n“”‘???’?„?”]/);
            if (matches != null) {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("InvalidWildCardUsage")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("InvalidWildCardUsage"));
                }
            }
        }
    },

    checkStartingWithANot: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkStartingWithANot (1)", queryToCheck)
        }
        // check beginning of query
        matches = queryToCheck.match(/^[-](\s){0,}[a-zA-Z0-9\x80-\xFF_+\-:.()~\^\"*?&|!{}\[\]\\@#\/$%'= \r\n“”‘???’?„?”]|^([N|n][O|o][T|t])(\s{1,})([a-zA-Z0-9\x80-\xFF_+\-:.()~\^"*?&|!{}\[\]\\@#\/$%'= \r\n“”‘???’?„?”]{0,})$/);
        if (matches != null) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("InvalidNotUsage")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("InvalidNotUsage"));
            }
        }
        // remove paterns that are valid
        queryToCheck = this.removeValidPhrasePatterns(queryToCheck);
        if (this.UseConsoleLog) {
            console.log("checkStartingWithANot (2)", queryToCheck)
        }
        // check remaining query
        if (queryToCheck != "") {
            matches2 = queryToCheck.match(/^(\s{0,})([N|n][O|o][T|t])(\s{0,})$/);
            if (matches2 != null) {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("InvalidNotUsage")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("InvalidNotUsage"));
                }
            }
        }
    },


    checkParentheses: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkParentheses", queryToCheck)
        }
        var hasLeft = false;
        var hasRight = false;
        matchLeft = queryToCheck.match(/[(]/g);
        if (matchLeft != null) hasLeft = true
        matchRight = queryToCheck.match(/[)]/g);
        if (matchRight != null) hasRight = true;

        if (hasLeft || hasRight) {
            if (hasLeft && !hasRight || hasRight && !hasLeft) {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("DidNotCloseParentheses")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("DidNotCloseParentheses"));
                }
            } else {
                var number = matchLeft.length + matchRight.length;
                if ((number % 2) > 0 || matchLeft.length != matchRight.length) {
                    if (this.errorMessages.indexOf($.solrValidatorMessages.get("DidNotCloseParentheses")) == -1) {
                        this.errorMessages.push($.solrValidatorMessages.get("DidNotCloseParentheses"));
                    }
                }
            }
            matches = this.query.match(/\(\)/);
            if (matches != null) {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("InvalidParentheses")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("InvalidParentheses"));
                }
            }
        }
    },

    checkAmpersands: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkAmpersands", queryToCheck)
        }
        matches = queryToCheck.match(/[&]{2}/);
        if (matches != null && matches.length > 0) {
            matches = queryToCheck.match(/&&/);
            if (matches != null) {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("DoubleAmpersands")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("DoubleAmpersands"));
                }
            }
        }
    },

    checkCaret: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkCaret (1)", queryToCheck)
        }
        // remove paterns that are valid
        queryToCheck = this.removeValidPhrasePatterns(queryToCheck);
        if (this.UseConsoleLog) {
            console.log("checkCaret (2)", queryToCheck)
        }
        // check remaining query
        if (queryToCheck.trim() != "") {
            matches = queryToCheck.match(/\^/);
            if (matches != null && matches.length > 0) {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("CaretNotAllowed")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("CaretNotAllowed"));
                }
            }
        }
    },
    checkSquiggle: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkSquiggle", queryToCheck)
        }
        matches = queryToCheck.match(/~/);
        if (matches != null) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("SquiggleNotAllowed")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("SquiggleNotAllowed"));
            }
        }
    },

//    // Boost......Jakarta^4 apache
//    checkBoostCaret: function (queryToCheck) {
//        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
//        if (this.UseConsoleLog) {
//            console.log("checkBoostCaret (1)", queryToCheck)
//        }
//        queryToCheck = this.removePhrases(queryToCheck);
//        if (this.UseConsoleLog) {
//            console.log("checkBoostCaret (2)", queryToCheck)
//        }
//        matches = queryToCheck.match(/\^/g);
//        if (matches != null) {
//            BoostMatches = this.query.match(/([\"]+[\w\d]*|[\w\d]*)[\^][\d]+/g);
//            if (BoostMatches == null) {
//                if (this.errorMessages.indexOf($.solrValidatorMessages.get("InvalidBoostCaret")) == -1) {
//                    this.errorMessages.push($.solrValidatorMessages.get("InvalidBoostCaret"));
//                }
//            } else {
//                if (matches.length != BoostMatches.length) {
//                    if (this.errorMessages.indexOf($.solrValidatorMessages.get("InvalidBoostCaret")) == -1) {
//                        this.errorMessages.push($.solrValidatorMessages.get("InvalidBoostCaret"));
//                    }
//                }
//            }
//        }
//    },

    // Near......"Jakarta apache"~10
    checkNearSquiggle: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkNearSquiggle (1)", queryToCheck)
        }
        matches = queryToCheck.match(/~/g);
        if (matches != null) {
            // remove all valid near patterns
            queryToCheck = queryToCheck.replace(/[\"][\w\d ]*[\"]( ){0,1}[\~][\d]+/g, "");
            // remove valid phrase patterns
            queryToCheck = this.removePhrases(queryToCheck);
            // still any ~ left?
            InvalidBoostMatches = queryToCheck.match(/~/g);
            if (InvalidBoostMatches != null) {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("InvalidNearUsage")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("InvalidNearUsage"));
                }
            }
        }
    },



    checkExclamationMark: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkExclamationMark", queryToCheck)
        }
        queryToCheck = this.removePhrases(queryToCheck);
        if (this.UseConsoleLog) {
            console.log("checkExclamationMark (2)", queryToCheck)
        }
        matches = queryToCheck.match(/^!|[a-zA-Z0-9\x80-\xFF_+\-:.()\"*?&|!{}\[\]\^~\\@#\/$%'=] ! [a-zA-Z0-9\x80-\xFF_+\-:.()\"*?&|!{}\[\]\^~\\@#\/$%'=]|!$/);
        if (matches != null && matches.length > 0) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("InvalidExclamationMarkUsage")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("InvalidExclamationMarkUsage"));
            }
        }
    },

    checkQuestionMark: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkQuestionMark", queryToCheck)
        }
        queryToCheck = this.removePhrases(queryToCheck);
        if (this.UseConsoleLog) {
            console.log("checkQuestionMark (2)", queryToCheck)
        }
        //matches = this.query.match(/^(\?)|([^a-zA-Z0-9\x80-\xFF_+\-:.()\"*?&|!{}\[\]\^~\\@#\/$%'=]\?+)/);
        matches = queryToCheck.match(/( )+\?( )+|( )+\?$|^\?( )+|\:\?( )+/);
        if (matches != null && matches.length > 0) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("InvalidQuestionMarkUsage")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("InvalidQuestionMarkUsage"));
            }
        }
    },

    checkQuestionMarkNotAllowed: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkQuestionMarkNotAllowed", queryToCheck)
        }
        matches = queryToCheck.match(/\?/);
        if (matches != null) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("NoSingleWildCardUsage")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("NoSingleWildCardUsage"));
            }
        }
    },


    checkPlusMinus: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkPlusMinus (1)", queryToCheck)
        }
        // remove paterns that are valid
        queryToCheck = this.removeValidPhrasePatterns(queryToCheck);
        if (this.UseConsoleLog) {
            console.log("checkPlusMinus (2)", queryToCheck)
        }
        // check remaining query
        if (queryToCheck.trim() != "") {
            matches = queryToCheck.match(/^\[-\+](\s{1})|(\s{1})[-\+](\s{1})|^[-\+]$|(\s{1})[-\+]$/);
            if (matches != null && matches.length > 0) {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("InvalidPlusMinusUsage")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("InvalidPlusMinusUsage"));
                }
            }
        }
    },

    checkInvalidNot: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkInvalidNot", queryToCheck)
        }
        matches = queryToCheck.match(/(OR( )*-|OR( )*NOT)/g);
        if (matches != null && matches.length > 0) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("InvalidNot")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("InvalidNot"));
            }
        }
    },

    checkDoubleOR: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkDoubleOR", queryToCheck)
        }
        matches = queryToCheck.match(/^(OR( ){1,}OR( ){1,}){1,}|(( ){1,}OR( ){1,}OR( ){1,}){1,}|(( ){1,}OR( ){1,}OR){1,}$/);
        if (matches != null && matches.length > 0) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("DoubleOr")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("DoubleOr"));
            }
        }
    },
    checkDoubleAND: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkDoubleAND", queryToCheck)
        }
        matches = queryToCheck.match(/(\s+    AND){2,}/g);
        if (matches != null && matches.length > 0) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("DoubleAnd")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("DoubleAnd"));
            }
        }
    },
    checkORInParenthesisEnd: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkORInParenthesis", queryToCheck)
        }
        matches = queryToCheck.match(/( OR( )*\))/g);
        if (matches != null && matches.length > 0) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("checkORInParenthesisEnd")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("checkORInParenthesisEnd"));
            }
        }
    },
    checkORInParenthesisBegin: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkORInParenthesis", queryToCheck)
        }
        matches = queryToCheck.match(/(\(( )*OR( ){1,})/g);
        if (matches != null && matches.length > 0) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("checkORInParenthesisBegin")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("checkORInParenthesisBegin"));
            }
        }
    },
    checkANDInParenthesis: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkANDInParenthesis", queryToCheck)
        }
        matches = queryToCheck.match(/( AND( )*\))/g);
        if (matches != null && matches.length > 0) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("checkANDInParenthesis")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("checkANDInParenthesis"));
            }
        }
    },
    checkSlash: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkSlash (1)", queryToCheck)
        }
        queryToCheck = this.removePhrases(queryToCheck);
        if (this.UseConsoleLog) {
            console.log("checkSlash (2)", queryToCheck)
        }
        matches = queryToCheck.match(/\//);
        if (matches != null) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("ForwardSlashNotAllowed")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("ForwardSlashNotAllowed"));
            }
        }

        matches = queryToCheck.match(/\\/);
        if (matches != null) {
            if (this.errorMessages.indexOf($.solrValidatorMessages.get("BackwardSlashNotAllowed")) == -1) {
                this.errorMessages.push($.solrValidatorMessages.get("BackwardSlashNotAllowed"));
            }
        }
    },

    checkQuotes: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkQuotes", queryToCheck)
        }
        matches = queryToCheck.match(/\"/g);
        if (matches != null && matches.length > 0) {
            var number = matches.length;
            if ((number % 2) > 0) {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("DidNotCloseQuotes")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("DidNotCloseQuotes"));
                }
            }
            matches = queryToCheck.match(/""/);
            if (matches != null) {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("EmptyQuotes")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("EmptyQuotes"));
                }
            }
        }
    },
    checkColonAtEnd: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkColonAtEnd", queryToCheck)
        }
        matches = queryToCheck.match(/:$/);
        if (matches != null) {
            if (this.mode == 'normal') {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("SingleColonNotAllowed")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("SingleColonNotAllowed"));
                }
            } else {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("ColonNotAllowed")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("ColonNotAllowed"));
                }
            }

        }
    },

    checkColonAtBeginning: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkColonAtBeginning", queryToCheck)
        }
        matches = queryToCheck.match(/^:/);
        if (matches != null) {
            if (this.mode == 'normal') {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("SingleColonNotAllowed")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("SingleColonNotAllowed"));
                }
            } else {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("ColonNotAllowed")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("ColonNotAllowed"));
                }
            }
        }
    },

    checkColon: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkColon", queryToCheck)
        }
        if (this.allowedSolrFields != null && this.allowedSolrFields.length > 0) {
            matches = queryToCheck.match(/ :[a-zA-Z0-9\x80-\xFF_+\-.()~\^\"*?&|!{}\[\]\\@#\/$%'= \r\n“”‘???’?„?”]| :$/);
            if (matches != null) {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("SingleColonNotAllowed")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("SingleColonNotAllowed"));
                }
            }
            matches = queryToCheck.match(/:{2,}/);
            if (matches != null) {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("DoubleColonNotAllowed")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("DoubleColonNotAllowed"));
                }
            }
        } else {
            matches = queryToCheck.match(/:/g);
            if (matches != null) {
                if (this.errorMessages.indexOf($.solrValidatorMessages.get("ColonNotAllowed")) == -1) {
                    this.errorMessages.push($.solrValidatorMessages.get("ColonNotAllowed"));
                }
            }
        }
    },

    checkAllowedFields: function (queryToCheck) {
        queryToCheck = typeof queryToCheck !== 'undefined' ? queryToCheck : this.query;
        if (this.UseConsoleLog) {
            console.log("checkAllowedFields (1)", queryToCheck)
        }
        if (this.allowedSolrFields != null && this.allowedSolrFields.length > 0) {
            var fieldsAreOkay = true;
            queryToCheck = this.removePhrases(queryToCheck);
            if (this.UseConsoleLog) {
                console.log("checkAllowedFields (2)", queryToCheck)
            }
            matches = queryToCheck.match(/[a-zA-Z0-9\x80-\xFF_]+:/g);
            if (matches != null) {
                for (i = 0; i < matches.length; i++) {
                    var fieldIndex = this.allowedSolrFields.indexOf("|" + matches[i] + "|");
                    if (fieldIndex == -1) {
                        fieldsAreOkay = false;
                    }
                }
                if (!fieldsAreOkay) {
                    this.errorMessages.push($.solrValidatorMessages.get("NotAllowedField"));
                    if (this.errorMessages.indexOf($.solrValidatorMessages.get("NotAllowedField")) == -1) {
                        this.errorMessages.push($.solrValidatorMessages.get("NotAllowedField"));
                    }
                }
            }
        }
    }
}


