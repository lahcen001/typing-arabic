# Arabic Keyboard App

A beautiful, modern web application that provides Arabic text input using English transliteration.

## 🌟 Features

- **Smart Transliteration**: Type in English and get Arabic text automatically
- **Real-time Conversion**: See your text converted as you type
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Bilingual Support**: Switch between English and Arabic interface
- **Interactive Examples**: Click on examples to try them instantly
- **Copy Functionality**: Easy one-click copying of Arabic text
- **Character Counter**: Keep track of your text length
- **Keyboard Shortcuts**: Efficient keyboard navigation
- **Mobile Responsive**: Works perfectly on all devices

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No internet connection required (all resources are local)

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start typing in English to see Arabic transliteration!

**Note**: The app now works completely offline as all dependencies are included locally.

### File Structure

```
arabic-keyboard/
├── index.html                    # Main HTML file
├── styles.css                    # CSS styles and responsive design
├── script.js                     # JavaScript functionality
├── arabic_transliteration.js     # Local Arabic transliteration script
└── README.md                     # This file
```

## 🎯 How to Use

### Basic Usage

1. **Start Typing**: Click in the text area and start typing English words
2. **Watch the Magic**: Your English text will be converted to Arabic automatically
3. **Copy Text**: Use the "Copy" button to copy the Arabic text to your clipboard
4. **Clear Text**: Use the "Clear" button to start fresh

### Examples to Try

- Type `ahlan wa sahlan` → أهلاً وسهلاً
- Type `marhaba` → مرحباً  
- Type `kayf halak` → كيف حالك
- Type `shukran` → شكراً

### Keyboard Shortcuts

- **Ctrl/Cmd + Enter**: Copy text to clipboard
- **Ctrl/Cmd + Delete**: Clear all text
- **Escape**: Clear focus from current element

### Interactive Features

- **Example Cards**: Click on any example card to load it into the editor
- **Language Toggle**: Switch between English and Arabic interface
- **Auto-resize**: Text areas automatically adjust to content
- **Smooth Scrolling**: Navigate smoothly between sections

## 🛠️ Technical Details

### Technologies Used

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Interactive functionality and DOM manipulation
- **Transliteration API**: Arabic transliteration engine
- **Font Awesome**: Beautiful icons
- **Google Fonts**: Noto Sans Arabic for proper Arabic text rendering

### Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Performance Features

- Optimized CSS with CSS variables
- Efficient JavaScript with event delegation
- Lazy loading of animations
- Responsive images and fonts

## 🎨 Customization

### Color Scheme

The app uses CSS custom properties (variables) for easy theming. You can modify the colors in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
    /* ... more variables */
}
```

### Adding New Examples

To add new examples, modify the HTML in `index.html`:

```html
<div class="example-card" data-text="your-english-text">
    <div class="example-input">your-english-text</div>
    <div class="example-arrow">→</div>
    <div class="example-output">النص العربي</div>
</div>
```

## 🔧 Configuration

### Transliteration Settings

The transliteration functionality can be customized by modifying the initialization code:

```javascript
if (ArabicTransliteration.init({ 
    uiLanguage: "ar", 
    startMode: "onOrUserDefault" 
})) {
    ArabicTransliteration.enable("", { settingsPlacement: "bottomLeft" });
}
```

Available options:
- `uiLanguage`: "ar" or "en"
- `startMode`: "on", "off", or "onOrUserDefault"
- `settingsPlacement`: "bottomLeft", "bottomRight", "topLeft", "topRight"

## 📱 Mobile Support

The app is fully responsive and includes:

- Touch-friendly interface
- Optimized layouts for mobile screens
- Proper viewport configuration
- Mobile-specific CSS optimizations

## 🌐 Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast color scheme
- Screen reader friendly
- Focus management

## 🐛 Troubleshooting

### Common Issues

1. **Transliteration not working**: Check your internet connection and ensure the transliteration API is accessible
2. **Fonts not loading**: Verify Google Fonts connection
3. **Copy not working**: Ensure you're using HTTPS or localhost (clipboard API requirement)

### Debug Mode

Open browser developer tools (F12) to see console messages and debug information.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section
2. Open an issue on GitHub
3. Contact the transliteration team for API-related questions

## �� Acknowledgments

- Arabic transliteration technology for providing smart text conversion
- [Font Awesome](https://fontawesome.com/) for the beautiful icons
- [Google Fonts](https://fonts.google.com/) for the Noto Sans Arabic font

---

**Made with ❤️ for the Arabic-speaking community** 