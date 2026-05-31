/**
 * Email Spam Detection System - JavaScript ML Implementation
 * GitHub Pages Compatible Version
 * Uses simplified Naive Bayes classifier in JavaScript
 */

class SpamDetector {
    constructor() {
        // Pre-trained model weights (simplified version for browser)
        this.spamWords = new Set([
            'free',
            'winner',
            'prize', 'claim', 'urgent', 'congratulations',
            'click', 'now', 'limited', 'offer', 'cash', 'money', 'win',
            'guaranteed', 'instant', 'bonus', 'discount', 'buy', 'purchase',
            'cheap', 'deal', 'subscribe', 'act', 'today', 'expires',
            'million', 'dollars', 'profit', 'income', 'earn', 'rich',
            'credit', 'loan', 'insurance', 'investment', 'stock', 'trading',
            'bitcoin', 'crypto', 'casino', 'lottery', 'sweepstakes',
            'viagra', 'prescription', 'weight', 'pill', 'medicine',
            'pharmacy', 'drug', 'nucle Phillies', 'nsfw', 'adult',
            'xxx', 'porn', 'erotic', 'disclaimer', 'forward', 'unsubscribe',
            'remove', 'list', 'email', 'promotion', 'sale', 'special', 'i phone', 'adult',
            'xxxx', 'porn', 'sex', 'singles', 'dating', 'matchmaking', 'hot girls', 'hot deals', 'become rich',
            'cash bonus', 'cheap meds', 'clearance', 'compare rates', 'consolidate debt', 'credit card',
            'debt relief', 'direct marketing', 'double your income', 'easy money', 'eliminate debt', 'extra income',
            'fast approval', 'financial aid', 'free access', 'free consultation', 'free gift', 'free hosting', 'free info',
            'free investment', 'free membership', 'free preview', 'free quote',
            'free sample',
            'free trial offer', 'winner',
            'won',
            'free',
            'cash',
            'prize',
            'offer',
            'urgent',
            'claim',
            'click',
            'buy',
            'cheap',
            'discount',
            'limited',
            'deal',
            'bonus',
            'gift',
            'credit',
            'loan',
            'money',
            'earn',
            'income',
            'profit',
            'investment',
            'lottery',
            'jackpot',
            'selected',
            'congratulations',
            'guaranteed',
            'risk-free',
            'trial',
            'subscribe',
            'unsubscribe',
            'call',
            'now',
            'act',
            'immediately',
            'order',
            'visit',
            'link',
            'promotion',
            'exclusive',
            'save',
            'double',
            'win',
            'reward',
            'voucher',
            'coupon',
            'lowest',
            'price',
            'weight',
            'loss',
            'diet',
            'medicine',
            'viagra',
            'casino',
            'bet',
            'gambling',
            'crypto',
            'bitcoin',
            'forex',
            'work',
            'home',
            'job',
            'vacancy',
            'urgent hiring',
            'selected candidate',
            'bank',
            'account',
            'verify',
            'otp',
            'password',
            'security',
            'alert',
            'update',
            'suspended',
            'confirm',
            'transaction',
            'payment',
            'invoice',
            'refund',
            'tax',
            'irs',
            'paypal',
            'amazon',
            'netflix',
            'gift card',
            'iphone',
            'samsung',
            'lucky draw',
            'million',
            'billion',
            'guarantee',
            'apply now',
            'fast cash',
            'no cost',
            '100% free',
            'congrats',
            'dear customer',
            'final notice',
            'important notice',
            'limited time',
            'best price',
            'click here',
            'open immediately',
            'access now',
            'earn daily',
            'make money',
            'financial freedom',
            'be your own boss',
            'full refund',
            'get paid',
            'giveaway',
            'great offer',
            'hidden charges',
            'home based',
            'human growth hormone',
            'increase sales',
            'instant',
            'instant access',
            'instant earnings',
            'instant income',
            'insurance',
            'internet marketing',
            'limited offer',
            'lowest rates',
            'luxury',
            'marketing solution',
            'meet singles',
            'miracle',
            'mortgage',
            'no catch',
            'no credit check',
            'no fees',
            'no hidden cost',
            'no investment',
            'no obligation',
            'no purchase necessary',
            'not junk',
            'offshore',
            'one time',
            'online biz',
            'online income',
            'opportunity',
            'passwords',
            'potential earnings',
            'pre-approved',
            'promise',
            'pure profit',
            'quote',
            'remove debt',
            'rolex',
            'satisfaction guaranteed',
            'search engine listings',
            'serious cash',
            'shop now',
            'special promotion',
            'stock alert',
            'stop wasting time',
            'this is not spam',
            'time sensitive',
            'unsecured credit',
            'vacation',
            'weight reduction',
            'while supplies last',
            'wire transfer',
            'work from home',
            'you are a winner',
            'your income',
            'zero risk',
            'access free',
            'act fast',
            'apply today',
            'auto loan',
            'best deal',
            'big bucks',
            'billing',
            'bulk email',
            'business opportunity',
            'buy direct',
            'cancel anytime',
            'certified',
            'cheap price',
            'clear debt',
            'collect',
            'compare',
            'confidentially',
            'copy accurately',
            'cures',
            'deal ends soon',
            'direct email',
            'do not delete',
            'don’t hesitate',
            'double income',
            'drastically reduced',
            'electronic cash',
            'email extractor',
            'expect to earn',
            'fantastic deal',
            'for instant access',
            'for only',
            'get started now',
            'great opportunity',
            'hurry up',
            'incredible deal',
            'increase traffic',
            'join millions',
            'limited stock',
            'lose weight fast',
            'mail in order form',
            'marketing',
            'member',
            'message contains',
            'month trial offer',
            'never before',
            'no age restrictions',
            'no experience needed',
            'now only',
            'offer expires',
            'one hundred percent',
            'open now',
            'order status',
            'performance',
            'please read',
            'priority mail',
            'produced and sent out',
            'purchase now',
            'refund available',
            'removal instructions',
            'risk free trial',
            'satisfaction',
            'save big money',
            'search engine',
            'selected winner',
            'social security number',
            'spam free',
            'special discount',
            'strong buy',
            'take action',
            'terms and conditions',
            'trial version',
            'unlimited income',
            'urgent response',
            'we hate spam',
            'web traffic',
            'weekend getaway',
            'winning notification',
            'wireless',
            'your chance',
            'your family',
            'your status'
        ]);

        this.hamWords = new Set([
            'hello', 'hi', 'thanks', 'thank', 'please', 'regards', 'best',
            'meeting', 'tomorrow', 'today', 'yesterday', 'week', 'month',
            'project', 'work', 'email', 'document', 'review', 'meeting',
            'call', 'phone', 'office', 'team', 'company', 'manager',
            'boss', 'colleague', 'friend', 'family', 'school', 'college',
            'university', 'class', 'assignment', 'exam', 'study', 'learn',
            'please', 'sorry', 'apologize', 'command', 'confirm', 'check',
            'update', 'info', 'information', 'question', 'answer', 'help'
        ]);

        // Spam indicators (patterns)
        this.spamPatterns = [
            /\$[0-9]+/,                              // Dollar amounts
            /[0-9]+%/,                              // Percentages
            /!!!/,                                  // Multiple exclamation marks
            /URGENT/i,                              // Urgent claims
            /CONGRATULATIONS/i,                     // Congratulations
            /WINNER/i,                              // Winner claims
            /FREE\s+(NOW|GIFT| ITEM)/i,            // Free offers
            /CLICK\s+HERE/i,                        // Click here
            /CLAIM\s+NOW/i,                         // Claim now
            /LIMITED\s+TIME/i,                      // Limited time
            /ACT\s+NOW/i,                           // Act now
            /NO\s+REQUIRED/i,                       // No required
            /100%\s+FREE/i,                         // 100% free
            /TRY\s+FREE/i,                          // Try free
            /\$\d+\s*(million|billion)/i,          // Big money claims
        ];

        this.initialized = true;
        console.log('SpamDetector initialized');
    }

    /**
     * Preprocess text for analysis
     */
    preprocessText(text) {
        // Convert to lowercase
        text = text.toLowerCase();

        // Remove special characters but keep spaces
        text = text.replace(/[^a-z0-9\s]/g, ' ');

        // Remove extra whitespace
        text = text.replace(/\s+/g, ' ').trim();

        return text;
    }

    /**
     * Tokenize text into words
     */
    tokenize(text) {
        return text.split(' ').filter(word => word.length > 2);
    }

    /**
     * Calculate spam score using simplified Naive Bayes
     */
    predict(text) {
        if (!text || text.trim().length === 0) {
            throw new Error('Please enter email text to analyze');
        }

        const processedText = this.preprocessText(text);
        const words = this.tokenize(processedText);

        let spamScore = 0;
        let hamScore = 0;

        // Word-based scoring
        words.forEach(word => {
            if (this.spamWords.has(word)) {
                spamScore += 2;
            }
            if (this.hamWords.has(word)) {
                hamScore += 1.5;
            }
        });

        // Pattern-based scoring
        this.spamPatterns.forEach(pattern => {
            if (pattern.test(text)) {
                spamScore += 3;
            }
        });

        // Length-based adjustments
        if (text.length < 50) {
            hamScore += 1; // Short messages are often legitimate
        }
        if (text.length > 500) {
            hamScore += 1; // Long messages are often legitimate
        }

        // Punctuation analysis
        const exclamationCount = (text.match(/!/g) || []).length;
        if (exclamationCount > 2) {
            spamScore += exclamationCount;
        }

        // All caps analysis
        const capsWords = words.filter(w => w === w.toUpperCase() && w.length > 1);
        if (capsWords.length > 3) {
            spamScore += capsWords.length;
        }

        // Calculate probabilities
        const totalScore = spamScore + hamScore + 1; // Add 1 for smoothing
        const spamProbability = (spamScore / totalScore) * 100;
        const hamProbability = (hamScore / totalScore) * 100;

        // Determine classification
        const isSpam = spamScore > hamScore;
        const confidence = Math.max(spamProbability, hamProbability);

        return {
            label: isSpam ? 'Spam' : 'Legitimate',
            isSpam: isSpam,
            confidence: Math.round(confidence * 10) / 10,
            spamProbability: Math.round(spamProbability * 10) / 10,
            hamProbability: Math.round(hamProbability * 10) / 10
        };
    }

    /**
     * Batch prediction
     */
    predictBatch(texts) {
        return texts.map(text => this.predict(text));
    }
}

// Global instance
let spamDetector = null;

/**
 * Initialize the spam detector
 */
function initializeDetector() {
    if (!spamDetector) {
        spamDetector = new SpamDetector();
    }
    return spamDetector;
}

/**
 * Analyze email text
 */
function analyzeEmail(text) {
    const detector = initializeDetector();
    return detector.predict(text);
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SpamDetector, analyzeEmail, initializeDetector };
}