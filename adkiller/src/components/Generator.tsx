import React, { useState, useEffect } from 'react';

interface ComponentProps {
  key: number;
  content: string;
}

const Generator: React.FC = () => {
  const [components, setComponents] = useState<ComponentProps[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleString();
      const newComponent: ComponentProps = {
        key: components.length,
        content: `This is a new component generated at ${now}`,
      };
      setComponents((prevComponents) => [...prevComponents, newComponent]);
    }, 1000); // 5秒ごとにコンポーネントを生成

    return () => clearInterval(interval); // クリーンアップ
  }, []);

  return (
    <div>
      <h1>My Component</h1>
      {components.map((component) => (
        <div key={component.key}>{component.content}</div>
      ))}
    </div>
  );
};

export default Generator;