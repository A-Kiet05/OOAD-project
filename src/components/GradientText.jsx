import '../styles/GradientText.css';

export default function GradientText({
  children,
  variant = "div",
  className = "",
  colors = ['#E0F778', '#DAD0E9', '#E0F778', '#DAD0E9', '#E0F778'],
  animationSpeed = 8,
  showBorder = false,
  style = {}
}) {
  const Tag = variant; // h1, h2, h3, div, span…

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`,
    ...style
  };

  return (
    <Tag className={`animated-gradient-text ${className}`}>
      {showBorder && (
        <div className="gradient-overlay" style={gradientStyle}></div>
      )}

      <span className="text-content" style={gradientStyle}>
        {children}
      </span>
    </Tag>
  );
}
