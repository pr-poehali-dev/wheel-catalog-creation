import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface CarBrand {
  id: string;
  name: string;
  logo: string;
}

interface CarModel {
  id: string;
  name: string;
  years: string;
}

interface CarConfig {
  diameter: number[];
  width: number[];
  pcd: string[];
  offset: number[];
}

const carBrands: CarBrand[] = [
  { id: 'bmw', name: 'BMW', logo: '🔷' },
  { id: 'mercedes', name: 'Mercedes-Benz', logo: '⭐' },
  { id: 'audi', name: 'Audi', logo: '⭕' },
  { id: 'vw', name: 'Volkswagen', logo: '🔵' },
  { id: 'toyota', name: 'Toyota', logo: '🔴' },
  { id: 'lexus', name: 'Lexus', logo: '⚫' },
  { id: 'porsche', name: 'Porsche', logo: '🏁' },
  { id: 'tesla', name: 'Tesla', logo: '⚡' },
];

const carModels: Record<string, CarModel[]> = {
  bmw: [
    { id: '3series', name: '3 Series', years: '2019-2024' },
    { id: '5series', name: '5 Series', years: '2017-2024' },
    { id: 'x5', name: 'X5', years: '2018-2024' },
    { id: 'm3', name: 'M3', years: '2020-2024' },
  ],
  mercedes: [
    { id: 'c-class', name: 'C-Class', years: '2018-2024' },
    { id: 'e-class', name: 'E-Class', years: '2016-2024' },
    { id: 'gle', name: 'GLE', years: '2019-2024' },
    { id: 'amg-gt', name: 'AMG GT', years: '2020-2024' },
  ],
  audi: [
    { id: 'a4', name: 'A4', years: '2019-2024' },
    { id: 'a6', name: 'A6', years: '2018-2024' },
    { id: 'q5', name: 'Q5', years: '2017-2024' },
    { id: 'rs6', name: 'RS6', years: '2020-2024' },
  ],
};

const carConfigs: Record<string, CarConfig> = {
  '3series': { diameter: [18, 19, 20], width: [8.0, 8.5, 9.0], pcd: ['5x112'], offset: [35, 40, 45] },
  '5series': { diameter: [19, 20, 21], width: [8.5, 9.0, 9.5], pcd: ['5x112'], offset: [40, 45, 50] },
  'x5': { diameter: [20, 21, 22], width: [9.0, 10.0, 11.0], pcd: ['5x120'], offset: [40, 45] },
  'm3': { diameter: [19, 20], width: [9.0, 9.5, 10.0], pcd: ['5x112'], offset: [35, 40] },
  'c-class': { diameter: [18, 19], width: [8.0, 8.5, 9.0], pcd: ['5x112'], offset: [35, 40, 45] },
  'e-class': { diameter: [19, 20], width: [8.5, 9.0, 9.5], pcd: ['5x112'], offset: [40, 45] },
  'gle': { diameter: [20, 21, 22], width: [9.0, 10.0], pcd: ['5x112'], offset: [45, 50] },
  'amg-gt': { diameter: [19, 20, 21], width: [9.0, 10.0, 11.0], pcd: ['5x112'], offset: [35, 40] },
  'a4': { diameter: [18, 19, 20], width: [8.0, 8.5, 9.0], pcd: ['5x112'], offset: [40, 45] },
  'a6': { diameter: [19, 20, 21], width: [8.5, 9.0, 9.5], pcd: ['5x112'], offset: [40, 45, 50] },
  'q5': { diameter: [19, 20, 21], width: [8.5, 9.0, 9.5], pcd: ['5x112'], offset: [40, 45] },
  'rs6': { diameter: [20, 21, 22], width: [9.0, 10.0, 11.0], pcd: ['5x112'], offset: [35, 40, 45] },
};

export default function CarSelector() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'brand' | 'model' | 'config'>(('brand'));
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedConfig, setSelectedConfig] = useState<CarConfig | null>(null);

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
    setStep('model');
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    const config = carConfigs[modelId];
    if (config) {
      setSelectedConfig(config);
      setStep('config');
    }
  };

  const handleSearch = () => {
    navigate('/?filter=true');
  };

  const resetSelection = () => {
    setStep('brand');
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedConfig(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Icon name="Circle" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold">WHEELS</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="hover:text-primary transition-colors">Главная</a>
            <a href="/#catalog" className="hover:text-primary transition-colors">Каталог</a>
            <a href="/selector" className="text-primary font-semibold">Подбор</a>
            <a href="/" className="hover:text-primary transition-colors">Бренды</a>
            <a href="/" className="hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button variant="outline" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Назад
          </Button>
        </div>
      </header>

      <section className="py-16 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Подбор дисков по автомобилю</h2>
            <p className="text-xl text-muted-foreground">
              Выберите марку и модель вашего авто для точного подбора
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-12">
            <div className={`flex items-center gap-2 ${step === 'brand' ? 'text-primary' : step !== 'brand' ? 'text-foreground' : 'text-muted-foreground'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 'brand' ? 'bg-primary text-primary-foreground' : step !== 'brand' ? 'bg-primary/20 text-primary' : 'bg-muted'}`}>
                1
              </div>
              <span className="font-semibold hidden sm:inline">Марка</span>
            </div>
            <div className="w-12 h-0.5 bg-border"></div>
            <div className={`flex items-center gap-2 ${step === 'model' ? 'text-primary' : step === 'config' ? 'text-foreground' : 'text-muted-foreground'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 'model' ? 'bg-primary text-primary-foreground' : step === 'config' ? 'bg-primary/20 text-primary' : 'bg-muted'}`}>
                2
              </div>
              <span className="font-semibold hidden sm:inline">Модель</span>
            </div>
            <div className="w-12 h-0.5 bg-border"></div>
            <div className={`flex items-center gap-2 ${step === 'config' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 'config' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                3
              </div>
              <span className="font-semibold hidden sm:inline">Параметры</span>
            </div>
          </div>

          {step === 'brand' && (
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold mb-6 text-center">Выберите марку автомобиля</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {carBrands.map((brand) => (
                  <Card
                    key={brand.id}
                    className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
                    onClick={() => handleBrandSelect(brand.id)}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="text-6xl mb-4">{brand.logo}</div>
                      <h4 className="font-bold text-lg">{brand.name}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === 'model' && selectedBrand && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Выберите модель</h3>
                <Button variant="outline" onClick={resetSelection}>
                  <Icon name="RotateCcw" size={18} className="mr-2" />
                  Сбросить
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {carModels[selectedBrand]?.map((model) => (
                  <Card
                    key={model.id}
                    className="cursor-pointer hover:shadow-xl hover:border-primary transition-all duration-300"
                    onClick={() => handleModelSelect(model.id)}
                  >
                    <CardContent className="p-6 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-xl mb-1">{model.name}</h4>
                        <p className="text-sm text-muted-foreground">{model.years}</p>
                      </div>
                      <Icon name="ChevronRight" size={24} className="text-primary" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === 'config' && selectedConfig && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Подходящие параметры дисков</h3>
                <Button variant="outline" onClick={resetSelection}>
                  <Icon name="RotateCcw" size={18} className="mr-2" />
                  Начать заново
                </Button>
              </div>
              
              <Card className="glass-effect mb-8">
                <CardHeader>
                  <CardTitle>Рекомендованные характеристики</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Circle" size={20} className="text-primary" />
                      <span className="font-semibold">Диаметр</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedConfig.diameter.map((d) => (
                        <Badge key={d} variant="secondary" className="text-base px-4 py-2">
                          {d}"
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Gauge" size={20} className="text-primary" />
                      <span className="font-semibold">Ширина</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedConfig.width.map((w) => (
                        <Badge key={w} variant="secondary" className="text-base px-4 py-2">
                          {w}"
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Target" size={20} className="text-primary" />
                      <span className="font-semibold">PCD (разболтовка)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedConfig.pcd.map((p) => (
                        <Badge key={p} variant="secondary" className="text-base px-4 py-2">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Move" size={20} className="text-primary" />
                      <span className="font-semibold">Вылет (ET)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedConfig.offset.map((o) => (
                        <Badge key={o} variant="secondary" className="text-base px-4 py-2">
                          ET {o}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button size="lg" className="text-lg px-12" onClick={handleSearch}>
                  Показать подходящие диски
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Мы подобрали диски, которые точно подойдут для вашего автомобиля
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
