"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const engine_1 = require("../engine");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3002;
// Serve static files from the dist/ui directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../ui')));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'BaZi Calculator API is running',
        version: '2.0.0'
    });
});
// Calculate BaZi chart endpoint
app.post('/api/calculate', (req, res) => {
    try {
        const { calendarType, year, month, day, hour, gender, isLeapMonth } = req.body;
        // Validate required fields
        if (calendarType == null || year == null || month == null || day == null || hour == null) {
            return res.status(400).json({
                error: 'Missing required fields: calendarType, year, month, day, hour are required'
            });
        }
        // Convert to numbers
        const numYear = Number(req.body.year);
        const numMonth = Number(req.body.month);
        const numDay = Number(req.body.day);
        const numHour = Number(req.body.hour);
        const isLeap = Boolean(isLeapMonth);
        // Validate conversions
        if (isNaN(numYear) || isNaN(numMonth) || isNaN(numDay) || isNaN(numHour)) {
            return res.status(400).json({
                error: 'All fields must be valid numbers'
            });
        }
        // Validate ranges
        if (numYear < 1900 || numYear > 2100) {
            return res.status(400).json({
                error: 'Year must be between 1900 and 2100'
            });
        }
        if (numMonth < 1 || numMonth > 12) {
            return res.status(400).json({
                error: 'Month must be between 1 and 12'
            });
        }
        if (numDay < 1 || numDay > 31) {
            return res.status(400).json({
                error: 'Day must be between 1 and 31'
            });
        }
        if (numHour < 0 || numHour > 23) {
            return res.status(400).json({
                error: 'Hour must be between 0 and 23'
            });
        }
        const validCalendars = ['solar', 'lunar'];
        const validatedCalendar = validCalendars.includes(calendarType) ? calendarType : 'solar';
        const validGenders = ['male', 'female'];
        const validatedGender = validGenders.includes(gender) ? gender : 'male';
        // Create calculator instance with new parameters
        const calculator = new engine_1.BaziCalculator(numYear, numMonth, numDay, numHour, validatedCalendar, validatedGender, isLeap);
        const result = calculator.calculatePillars();
        res.json(result);
    }
    catch (error) {
        console.error('Calculation error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to calculate BaZi chart',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get solar terms for a year
app.get('/api/solar-terms/:year', (req, res) => {
    try {
        const year = parseInt(req.params.year);
        if (isNaN(year) || year < 1900 || year > 2100) {
            return res.status(400).json({ error: 'Invalid year' });
        }
        const calculator = new engine_1.BaziCalculator(year, 1, 1, 12, 'solar', 'male');
        const result = calculator.calculatePillars();
        if (result.success && result.data) {
            res.json({
                success: true,
                data: result.data.solarTerms
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: 'Failed to get solar terms'
            });
        }
    }
    catch (error) {
        console.error('Solar terms error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get solar terms'
        });
    }
});
// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../ui/index.html'));
});
exports.default = app;
//# sourceMappingURL=server.js.map