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

var solrValidatorTranslations = {
    nl: {
        "EmptyQuery": "Geen zoekvraag opgegeven.",
        "QueryToLong": "De opgegevens zoekvraag is te lang. Maximum aantal karakters: ",
        "InvalidCharacter": "De zoekvraag bevat een teken dat niet is toegestaan.",
        "InvalidQuotes": "De zoekvraag bevat quotes die niet zijn toegestaan.",
        "InvalidWildCardUsage": "U kunt niet zoeken op een losse wildcard (*) of een wildcard plaatsen aan het begin van een woord",
        "NoWildCardUsage": "U kunt niet zoeken met een wildcard (*)",
        "NoSingleWildCardUsage": "U kunt niet zoeken met een wildcard (?)",
        "DidNotCloseParentheses": "Haken in de zoekvraag zijn niet correct toegepast of afgesloten.",
        "InvalidParentheses": "De zoekvraag bevat alleen haken zonder termen.",
        "DoubleAmpersands": "Het gebruik van twee ampersand tekens (&) in een zoekvraag is niet toegestaan.",
        "CaretNotAllowed": "Het gebruik van een circonflexe (^) in een zoekvraag is niet toegestaan.",
        "SquiggleNotAllowed": "Het gebruik van een tilde (~) in een zoekvraag is niet toegestaan.",
        "InvalidExclamationMarkUsage": "Een losstaand uitroepteken (!) is niet toegestaan.",
        "InvalidQuestionMarkUsage": "Een losstaand vraagteken (?) is niet toegestaan.",
        "InvalidPlusMinusUsage": "Een losstaand plus- of minteken (+/-) is niet toegestaan.",
        "InvalidBooleanOperators": "In de zoekvraag wordt op een niet correcte wijze gebruik gemaakt van AND, OR of AND NOT.",
        "EmptyQuotes": "Zoeken op alleen dubbele quotes is niet toegestaan.",
        "DidNotCloseQuotes": "Dubbele quotes zijn niet afgesloten.",
        "ColonNotAllowed": "Een dubbele punt (:) is niet toegestaan.",
        "SingleColonNotAllowed": "Een losstaand dubbele punt (:) is niet toegestaan.",
        "DoubleColonNotAllowed": "Uw zoekvraag bevat tweemaal achter elkaar een dubbele punt (:).",
        "ForwardSlashNotAllowed": "Een slash (/) is niet toegestaan.",
        "BackwardSlashNotAllowed": "Een slash (\\) is niet toegestaan.",
        "DoubleOr": "Uw zoekvraag bevat tweemaal achter elkaar een OR.",
        "DoubleAnd": "Uw zoekvraag bevat tweemaal achter elkaar een AND.",
        "InvalidNotUsage": "U kan een zoekvraag niet starten met een NOT (-)",
        "checkORInParenthesisEnd": "Binnen de haken eindigt de zoekvraag op OR",
        "checkORInParenthesisBegin": "Binnen de haken begint de zoekvraag met OR",
        "NotAllowedField": "Een gebruikt veld in de zoekactie is niet correct of toegestaan.",
        "InvalidNot": "Niet toegestaan 'OR NOT' of 'OR -' te gebruiken in een zoekvraag.",
        "DoNotUseAnd": "U kan geen gebruik maken van AND in een zoekvraag, gebruik hiervoor een spatie tussen de woorden.",
        "InvalidNearUsage": "De correcte syntax voor de nabijheidsparameter is bijvoorbeeld \"spanje zon\"~5 voor documenten waar spanje en zon 5 woorden van elkaar mogen staan.",
        "checkANDInParenthesis": "Binnen de haken eindigt de zoekvraag op AND."
    },

    en: {
        "EmptyQuery": "No query!",
        "QueryToLong": "The query is to long. Max allowed characters: ",
        "InvalidCharacter": "Query contains characters that are not allowed.",
        "InvalidQuotes": "Query contains quote characters that are not allowed.",
        "InvalidWildCardUsage": "The wildcard (*) character must be preceded by at least one alphabet or number.",
        "NoWildCardUsage": "Using a wildcard is not allowed (*)",
        "NoSingleWildCardUsage": "Using a wildcard is not allowed (?)",
        "DidNotCloseParentheses": "Parentheses must be closed.",
        "InvalidParentheses": "Parentheses must contain at least one character.",
        "DoubleAmpersands": "Using two ampersand (&&) is not allowed.",
        "CaretNotAllowed": "A caret (^) is not allowed.",
        "SquiggleNotAllowed": "A tilde (~) is not allowed.",
        "InvalidExclamationMarkUsage": "The exclamation mark (!) character must be preceded by at least one alphabet or number.",
        "InvalidQuestionMarkUsage": "The question mark (?) character must be preceded by at least one alphabet or number.",
        "InvalidPlusMinusUsage": "'+' and '-' modifiers must be followed by at least one alphabet or number.",
        "InvalidBooleanOperators": "Queries containing AND/OR/NOT must be in the form: term1 AND|OR|NOT|AND NOT term2.",
        "EmptyQuotes": "Quotes must contain at least one character.",
        "DidNotCloseQuotes": "Please close all quote (\") marks.",
        "ColonNotAllowed": "A colon (:) is not allowed in a query.",
        "SingleColonNotAllowed": "A colon (:) must be preceded by a valid field name.",
        "DoubleColonNotAllowed": "Quotes contains a repeated colon (:).",
        "ForwardSlashNotAllowed": "A slash (/) is not allowed in a query.",
        "BackwardSlashNotAllowed": "A slash (\\) is not allowed in a query.",
        "DoubleOr": "Quotes contains a repeated OR.",
        "DoubleAnd": "Quotes contains a repeated AND.",
        "InvalidNotUsage": "Do not start a query with NOT (-)",
        "checkORInParenthesisEnd": "Within parentheses the query ends with an OR.",
        "checkORInParenthesisBegin": "Within parentheses the query starts with an OR.",
        "NotAllowedField": "An invalid field was used in the query.",
        "InvalidNot": "Do not use 'OR NOT/ OR -' in a query.",
        "DoNotUseAnd": "Do not use 'AND' in a query.",
        "InvalidNearUsage": "The syntax for the proximity search is incorrect.",
        "checkANDInParenthesis": "Within parentheses the query ends with an AND."
    }
};

(function ($) {
    var texts;
    var language;


    function messageGet(spec) {
        if (typeof texts[language][spec] != "undefined") {
            var text = texts[language][spec];
            return text;
        } else {
            window.console.error("Missing " + language + " translation of " + spec);
            return "-- missing --";
        }
    }

    $.solrValidatorMessages = {
        get: messageGet,
        init: function (t, l) {
            texts = t;
            language = l;
        }
    };
})(window.jQuery);






