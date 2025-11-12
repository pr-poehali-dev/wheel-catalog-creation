import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Wheel {
  id: number;
  name: string;
  brand: string;
  diameter: number;
  width: number;
  offset: number;
  pcd: string;
  price: number;
  image: string;
}

const initialWheels: Wheel[] = [
  { id: 1, name: 'Sport RS-7', brand: 'VOSSEN', diameter: 19, width: 8.5, offset: 35, pcd: '5x112', price: 42500, image: 'https://cdn.poehali.dev/projects/0fba5438-15e5-4989-add6-6c4e66a1ea65/files/98da2876-c70b-49cb-9819-71eb582339a4.jpg' },
  { id: 2, name: 'Racing GT-R', brand: 'BBS', diameter: 20, width: 9.0, offset: 40, pcd: '5x120', price: 58000, image: 'https://cdn.poehali.dev/projects/0fba5438-15e5-4989-add6-6c4e66a1ea65/files/98da2876-c70b-49cb-9819-71eb582339a4.jpg' },
  { id: 3, name: 'Classic M5', brand: 'BBS', diameter: 18, width: 8.0, offset: 30, pcd: '5x114.3', price: 38900, image: 'https://cdn.poehali.dev/projects/0fba5438-15e5-4989-add6-6c4e66a1ea65/files/98da2876-c70b-49cb-9819-71eb582339a4.jpg' },
  { id: 4, name: 'Ultra Light', brand: 'OZ Racing', diameter: 19, width: 8.5, offset: 45, pcd: '5x112', price: 52000, image: 'https://cdn.poehali.dev/projects/0fba5438-15e5-4989-add6-6c4e66a1ea65/files/98da2876-c70b-49cb-9819-71eb582339a4.jpg' },
  { id: 5, name: 'Drift Pro', brand: 'Enkei', diameter: 18, width: 9.5, offset: 25, pcd: '5x114.3', price: 35000, image: 'https://cdn.poehali.dev/projects/0fba5438-15e5-4989-add6-6c4e66a1ea65/files/98da2876-c70b-49cb-9819-71eb582339a4.jpg' },
  { id: 6, name: 'Luxury Chrome', brand: 'VOSSEN', diameter: 22, width: 10.0, offset: 38, pcd: '5x120', price: 78000, image: 'https://cdn.poehali.dev/projects/0fba5438-15e5-4989-add6-6c4e66a1ea65/files/98da2876-c70b-49cb-9819-71eb582339a4.jpg' },
];

export default function Index() {
  const [cart, setCart] = useState<Wheel[]>([]);
  const [filters, setFilters] = useState({
    diameter: [17, 22],
    width: [7, 11],
    offset: [20, 50],
    pcd: '',
    search: '',
  });

  const addToCart = (wheel: Wheel) => {
    setCart([...cart, wheel]);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const filteredWheels = initialWheels.filter((wheel) => {
    const diameterMatch = wheel.diameter >= filters.diameter[0] && wheel.diameter <= filters.diameter[1];
    const widthMatch = wheel.width >= filters.width[0] && wheel.width <= filters.width[1];
    const offsetMatch = wheel.offset >= filters.offset[0] && wheel.offset <= filters.offset[1];
    const pcdMatch = !filters.pcd || wheel.pcd === filters.pcd;
    const searchMatch = !filters.search || wheel.name.toLowerCase().includes(filters.search.toLowerCase()) || wheel.brand.toLowerCase().includes(filters.search.toLowerCase());
    return diameterMatch && widthMatch && offsetMatch && pcdMatch && searchMatch;
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Circle" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold">WHEELS</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="hover:text-primary transition-colors">Главная</a>
            <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
            <a href="/selector" className="hover:text-primary transition-colors">Подбор</a>
            <a href="#" className="hover:text-primary transition-colors">Бренды</a>
            <a href="#" className="hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map((item, index) => (
                      <Card key={`${item.id}-${index}`} className="overflow-hidden">
                        <CardContent className="p-4 flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.brand}</p>
                            <p className="text-primary font-bold mt-1">{item.price.toLocaleString()} ₽</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Итого:</span>
                        <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString()} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Премиальные<br />диски для<br />вашего авто
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Широкий выбор колёсных дисков от ведущих мировых производителей
            </p>
            <Button size="lg" className="text-lg px-8">
              Смотреть каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-8">Каталог дисков</h3>
        
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="glass-effect sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <label className="text-sm font-semibold mb-3 block">Поиск</label>
                  <Input
                    placeholder="Название или бренд..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-3 block">
                    Диаметр: {filters.diameter[0]}" - {filters.diameter[1]}"
                  </label>
                  <Slider
                    min={17}
                    max={22}
                    step={1}
                    value={filters.diameter}
                    onValueChange={(value) => setFilters({ ...filters, diameter: value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-3 block">
                    Ширина: {filters.width[0]}" - {filters.width[1]}"
                  </label>
                  <Slider
                    min={7}
                    max={11}
                    step={0.5}
                    value={filters.width}
                    onValueChange={(value) => setFilters({ ...filters, width: value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-3 block">
                    Вылет (ET): {filters.offset[0]} - {filters.offset[1]}
                  </label>
                  <Slider
                    min={20}
                    max={50}
                    step={5}
                    value={filters.offset}
                    onValueChange={(value) => setFilters({ ...filters, offset: value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-3 block">PCD</label>
                  <select
                    className="w-full px-3 py-2 rounded-md bg-background border border-input"
                    value={filters.pcd}
                    onChange={(e) => setFilters({ ...filters, pcd: e.target.value })}
                  >
                    <option value="">Все</option>
                    <option value="5x112">5x112</option>
                    <option value="5x120">5x120</option>
                    <option value="5x114.3">5x114.3</option>
                  </select>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setFilters({ diameter: [17, 22], width: [7, 11], offset: [20, 50], pcd: '', search: '' })}
                >
                  Сбросить фильтры
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredWheels.map((wheel) => (
                <Card key={wheel.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in">
                  <div className="relative overflow-hidden bg-gradient-to-br from-secondary to-card">
                    <img
                      src={wheel.image}
                      alt={wheel.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4">{wheel.brand}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold mb-2">{wheel.name}</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Icon name="Circle" size={14} />
                        <span>{wheel.diameter}"</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Gauge" size={14} />
                        <span>{wheel.width}"</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Move" size={14} />
                        <span>ET {wheel.offset}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Target" size={14} />
                        <span>{wheel.pcd}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {wheel.price.toLocaleString()} ₽
                      </span>
                      <Button onClick={() => addToCart(wheel)}>
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredWheels.length === 0 && (
              <div className="text-center py-16">
                <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground">Ничего не найдено</p>
                <p className="text-muted-foreground mt-2">Попробуйте изменить параметры фильтрации</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-border mt-20 py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Circle" size={28} className="text-primary" />
                <h3 className="text-xl font-bold">WHEELS</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Премиальные колёсные диски для вашего автомобиля
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Все диски</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Новинки</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Акции</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (495) 123-45-67</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@wheels.ru</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 WHEELS. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}