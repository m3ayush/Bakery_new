import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu as MenuIcon, X, Navigation, MousePointer2, ChevronRight, Activity, Cpu, CakeSlice, MapPin, ShoppingCart, Minus, Plus, Trash2, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const globalProducts = [
  { id: 101, category: 'Cakes', name: 'Black Forest Truffle', price: 45.00, rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600', desc: 'A rich, multi-layered chocolate sponge cake with fresh cream and dark cherry compote, enveloped in chocolate shavings.' },
  { id: 102, category: 'Cakes', name: 'Red Velvet Supreme', price: 55.00, rating: 4.9, reviews: 89, image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=600', desc: 'Lush crimson sponge layered with our signature smooth Madagascar vanilla cream cheese frosting.' },
  { id: 103, category: 'Cakes', name: 'Vanilla Bean Buttercream', price: 40.00, rating: 4.6, reviews: 56, image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=600', desc: 'Classic, elegant white cake infused with real vanilla bean pods and covered in silky Swiss meringue buttercream.' },

  { id: 201, category: 'Pastries', name: 'Fruit Tart Collection', price: 12.00, rating: 4.7, reviews: 210, image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=600', desc: 'Crisp, buttery tart shell filled with rich pastry cream and crowned with fresh seasonal berries.' },
  { id: 202, category: 'Pastries', name: 'Chocolate Eclair', price: 8.50, rating: 4.9, reviews: 340, image: 'https://images.unsplash.com/photo-1620921575454-e7225119ff3d?q=80&w=600', desc: 'Classic choux pastry filled with luscious vanilla custard and glazed with dark Belgian chocolate.' },
  { id: 203, category: 'Pastries', name: 'Opera Cake Slice', price: 14.00, rating: 5.0, reviews: 67, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600', desc: 'Exquisite French gâteau consisting of almond sponge cake soaked in coffee syrup, layered with ganache.' },

  { id: 301, category: 'Croissants', name: 'Classic Butter Croissant', price: 6.50, rating: 4.9, reviews: 512, image: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?q=80&w=600', desc: 'Perfectly laminated, shatteringly crisp on the outside, soft and buttery web on the inside.' },
  { id: 302, category: 'Croissants', name: 'Almond Twice-Baked', price: 8.00, rating: 4.8, reviews: 245, image: 'https://images.unsplash.com/photo-1623366302587-bcaad58e0a39?q=80&w=600', desc: 'Our day-old croissants revived with rum syrup, frangipane filling, and toasted sliced almonds.' },
  { id: 303, category: 'Croissants', name: 'Pain au Chocolat', price: 7.00, rating: 4.9, reviews: 430, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600', desc: 'Crisp, buttery dough wrapped around two batons of dark French baking chocolate.' },

  { id: 401, category: 'Cupcakes', name: 'Double Chocolate', price: 5.50, rating: 4.6, reviews: 120, image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=600', desc: 'Moist chocolate base topped with a towering swirl of whipped chocolate ganache.' },
  { id: 402, category: 'Cupcakes', name: 'Strawberry Vanilla', price: 5.50, rating: 4.5, reviews: 90, image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=600', desc: 'Vanilla bean cupcake crowned with fresh strawberry buttercream icing and a fresh berry.' },

  { id: 501, category: 'Artisan Breads', name: 'Sourdough Boule', price: 10.00, rating: 4.9, reviews: 300, image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?q=80&w=600', desc: 'Naturally leavened crusty boule with a deeply developed sour tang and a beautifully open crumb.' }
];

// ==============================
// 1. NAVBAR - The Floating Island
// ==============================
const Navbar = ({ cartItems = [], setIsCartOpen }) => {
  const navRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
          className: 'scrolled-nav',
          targets: navRef.current
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // ScrollToTop strictly for React Router transition to separate pages
  const location = useLocation();
  const isDarkNavPage = location.pathname === '/menu' || location.pathname === '/about';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav ref={navRef} className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full transition-all duration-500 border ${isDarkNavPage ? 'bg-background/90 backdrop-blur-xl text-primary border-primary/20 shadow-2xl' : 'bg-transparent text-background border-transparent [&.scrolled-nav]:bg-background/90 [&.scrolled-nav]:backdrop-blur-xl [&.scrolled-nav]:text-primary [&.scrolled-nav]:border-primary/20 [&.scrolled-nav]:shadow-2xl'}`}>
      <div className="flex items-center justify-between px-6 py-3 md:px-8 md:py-4">
        <Link to="/" className="font-heading font-bold text-xl tracking-tight">My Cake Valley</Link>
        <div className="hidden lg:flex gap-8 font-data text-sm font-medium tracking-wide">
          <Link to="/menu" className="hover:-translate-y-[1px] transition-transform">Menu</Link>
          <Link to="/about" className="hover:-translate-y-[1px] transition-transform">About Us</Link>
          <a href="/#locations" className="hover:-translate-y-[1px] transition-transform">Locations</a>
          <a href="/#custom" className="hover:-translate-y-[1px] transition-transform">Custom Requests</a>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-dark/10 [&.scrolled-nav_&]:hover:bg-primary/10 transition-colors"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-dark text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-background">
                {cartItemCount}
              </span>
            )}
          </button>

          <Link to="/menu" className="magnetic-btn bg-accent text-dark px-6 py-2 text-sm font-bold tracking-wide rounded-full inline-block">
            <span className="relative z-10">Order Now</span>
            <span className="hover-layer bg-primary/20"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

// ==============================
// 2. HERO - The Opening Shot
// ==============================
const Hero = () => {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-anim', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative h-[100dvh] w-full overflow-hidden flex items-end">
      {/* Background Image & Gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1509440159596-0249088772ff?w=2000&q=80')]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#8C6239] via-black/40 to-black/60" />

      {/* Content strictly in bottom-left third */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32 md:w-2/3">
        <h1 className="hero-anim font-heading font-extrabold text-5xl md:text-7xl text-background leading-tight mb-2">
          artisan baking crafted
        </h1>
        <h2 className="hero-anim font-drama italic text-7xl md:text-9xl text-accent mb-8 leading-[0.8]">
          By heritage tradition.
        </h2>

        <p className="hero-anim font-data text-background/80 max-w-md text-lg md:text-xl mb-10 leading-relaxed">
          Daily fresh bakes, signature layered cakes, and delicate morning pastries across four city locations.
        </p>

        <button className="hero-anim magnetic-btn bg-background text-primary px-8 py-4 text-lg font-bold">
          <span className="relative z-10">Explore Our Collection</span>
          <span className="hover-layer bg-accent/30"></span>
        </button>
      </div>
    </section>
  );
};

// ==============================
// 3. FEATURES - Functional Artifacts
// ==============================
const FeatureCard1 = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Artisan Cakes', desc: 'Custom layered creations', color: 'bg-primary text-background' },
    { id: 2, name: 'Croissants', desc: 'Laminated butter folds', color: 'bg-accent text-dark' },
    { id: 3, name: 'Pastries', desc: 'Delicate morning bakes', color: 'bg-background text-primary border border-primary/20' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background rounded-[2rem] p-8 shadow-xl relative min-h-[400px] h-full border border-primary/10 flex flex-col justify-between overflow-hidden">
      <div className="font-heading font-bold text-2xl text-primary mb-8">01 / The Menu</div>

      <div className="relative h-[200px] w-full perspective-1000 mt-auto">
        {items.map((item, index) => {
          // Calculate stack positioning
          const isTop = index === 0;
          const isMiddle = index === 1;
          const isBottom = index === 2;

          return (
            <div
              key={item.id}
              className={`absolute bottom-0 w-full rounded-3xl p-6 transition-all duration-[800ms] cubic-bezier-[0.34,1.56,0.64,1] ${item.color} ${isTop ? 'z-30 translate-y-0 scale-100 opacity-100 shadow-2xl' : isMiddle ? 'z-20 -translate-y-6 scale-95 opacity-80' : 'z-10 -translate-y-12 scale-90 opacity-40'}`}
            >
              <h3 className="font-heading font-bold tracking-tight text-xl mb-1">{item.name}</h3>
              <p className="font-data text-sm opacity-80">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FeatureCard2 = () => {
  const [text, setText] = useState('');
  const fullText = "SYS_CHK: 4 Locations Active.\n> Central: Croissants OK.\n> East: Cakes Low.\n> West: Pastries Restocked.\n> North: Custom Slots Open.\n\nAwaiting Orders...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length + 10) index = 0; // loop
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-dark rounded-[2rem] p-8 shadow-xl relative min-h-[400px] h-full flex flex-col justify-between overflow-hidden text-background">
      <div>
        <div className="mb-8 flex items-center gap-3">
          <Activity size={24} className="text-accent" />
          <span className="font-heading font-bold text-xl text-accent">02 / Telemetry</span>
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-auto"></div>
        </div>

        <div className="font-data font-mono text-sm leading-relaxed whitespace-pre-wrap opacity-80">
          {text}
          <span className="inline-block w-2 bg-accent h-4 ml-1 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

const FeatureCard3 = () => {
  useEffect(() => {
    let ctx = gsap.context(() => {
      let tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tl.to('.v-cursor', { x: 80, y: 60, duration: 1, ease: 'power2.inOut' })
        .to('.v-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .set('.grid-cell-target', { backgroundColor: '#D9C5B2', color: '#2D2926' })
        .to('.v-cursor', { x: 220, y: 180, duration: 1, ease: 'power2.inOut', delay: 0.5 })
        .to('.v-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .set('.btn-target', { backgroundColor: '#8C6239', color: '#F9F7F2' })
        .to('.v-cursor', { opacity: 0, duration: 0.5 })
        .set('.grid-cell-target', { backgroundColor: 'transparent', color: '#2D2926' })
        .set('.btn-target', { backgroundColor: 'transparent', color: '#2D2926' })
        .set('.v-cursor', { x: 0, y: 0, opacity: 1 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-background rounded-[2rem] p-8 shadow-xl relative min-h-[400px] h-full flex flex-col justify-between border border-primary/10 overflow-hidden">
      <div className="font-heading font-bold text-2xl text-primary mb-8">03 / Scheduler</div>

      <div className="relative border border-primary/20 rounded-xl p-4 w-full max-w-[280px] mx-auto">
        {/* Fake Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-4 text-center font-data text-xs font-bold text-dark/50">
          <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-6 text-center font-data text-sm">
          {[...Array(14)].map((_, i) => (
            <div key={i} className={`rounded-md p-1 ${i === 10 ? 'grid-cell-target transition-colors' : ''}`}>
              {i + 1}
            </div>
          ))}
        </div>

        <div className="btn-target border-2 border-primary/30 rounded-full py-2 text-center font-heading font-bold text-sm transition-colors">
          Request Slot
        </div>

        {/* SVG Cursor */}
        <MousePointer2 className="v-cursor absolute top-0 left-0 w-6 h-6 text-primary fill-accent z-20 pointer-events-none drop-shadow-md" />
      </div>
    </div>
  );
};

// ==============================
// 3. ABOUT US - Dedicated Page
// ==============================
const AboutUs = () => {
  return (
    <section className="bg-background min-h-screen pt-32 pb-24 px-6 md:px-12 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="font-data font-mono tracking-widest text-primary/60 text-sm uppercase mb-6">Our Heritage</div>
          <h1 className="font-heading font-bold text-5xl md:text-7xl text-dark mb-8 leading-tight">
            Obsession in every <span className="text-primary italic font-drama">layer.</span>
          </h1>
          <p className="font-data text-xl text-dark/70 leading-relaxed">
            What started as a single oven in a quiet alley has grown into four artisan sanctuaries across the city. We believe that true baking is a science of patience and an art of precision.
          </p>
        </div>

        {/* Artistic Dual-Panel Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 h-[600px] md:h-[800px] mb-24">
          <div className="md:col-span-5 h-[300px] md:h-[600px] mt-auto relative rounded-[3rem] overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1542691457-cbe4df041bf2?q=80&w=1200" alt="Baker dusting flour" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-dark/20 mix-blend-multiply transition-colors duration-500 group-hover:bg-transparent"></div>
          </div>
          <div className="md:col-span-7 h-[300px] md:h-[700px] relative rounded-[3rem] overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1495147466023-af5c1926673a?q=80&w=1200" alt="Fresh artisan bread out of the oven" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply transition-colors duration-500 group-hover:bg-transparent"></div>
          </div>
        </div>

        {/* Story Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div>
            <h3 className="font-heading font-bold text-3xl mb-6">The Start</h3>
            <p className="font-data text-dark/70 leading-relaxed text-lg mb-6">In 2012, we set out to perfect the single hardest pastry in the world: the classic butter croissant. 14,000 test batches later, we opened our doors. That same relentless protocol is applied to everything from our dark chocolate truffles to our 72-hour fermented sourdough.</p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-3xl mb-6">The Process</h3>
            <p className="font-data text-dark/70 leading-relaxed text-lg mb-6">There are no shortcuts here. Our lamination process takes exactly 3 days. Our fruit is sourced directly from farms within a 50-mile radius. We do not use commercial yeast in our breads. This is the difference you can taste in the crumb structure.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==============================
// 4. FEATURES - Functional Artifacts
// ==============================
const Features = () => {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="py-12 px-6 max-w-7xl mx-auto">
      {/* Product Image Showcase to break up the text */}
      <div
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="w-full mb-12 rounded-[2rem] overflow-hidden h-[40vh] relative group cursor-pointer"
      >
        <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2000" alt="Fresh baked artisan breads and croissants" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
        <div className="absolute bottom-10 left-10 text-background">
          <span className="font-mono text-sm tracking-widest bg-dark/60 backdrop-blur-sm px-4 py-2 rounded-full mb-4 inline-block">OUR SPECIALTIES</span>
          <h3 className="font-heading text-4xl md:text-5xl font-bold">Lamination & Crumb.</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="feature-card h-full cursor-pointer">
          <Link to="/menu" className="block h-full hover:-translate-y-2 transition-transform duration-500">
            <FeatureCard1 />
          </Link>
        </div>
        <div className="feature-card h-full cursor-pointer">
          <a href="/#locations" className="block h-full hover:-translate-y-2 transition-transform duration-500">
            <FeatureCard2 />
          </a>
        </div>
        <div className="feature-card h-full cursor-pointer">
          <a href="/#custom" className="block h-full hover:-translate-y-2 transition-transform duration-500">
            <FeatureCard3 />
          </a>
        </div>
      </div>
    </section>
  );
};

// ==============================
// 4. PHILOSOPHY - The Manifesto
// ==============================
const Philosophy = () => {
  const section = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax background
      gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Text reveal
      gsap.from('.phil-text', {
        scrollTrigger: {
          trigger: section.current,
          start: 'top 50%'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.3
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative py-48 px-6 bg-dark overflow-hidden flex items-center justify-center min-h-[80vh]">
      {/* Parallax texture */}
      <div className="absolute inset-0 bg-dark z-0"></div>
      <div
        className="parallax-bg absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transform scale-125 bg-[url('https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2000')]"
        style={{ pointerEvents: 'none' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark z-0"></div>

      <div className="relative z-10 w-full max-w-5xl text-center">
        <p className="phil-text font-data text-background/60 text-lg md:text-2xl mb-8 font-medium">
          Most bakeries focus on: automated mass production.
        </p>
        <h2 className="phil-text font-drama italic text-5xl md:text-8xl text-background leading-tight">
          We focus on: <span className="text-accent">handcrafted</span> obsession.
        </h2>
      </div>
    </section>
  );
};

// ==============================
// 5. PROTOCOL - Sticky Stacking Archive
// ==============================
const ProtocolStack = ({ cartItems, setCartItems }) => {
  const containerRef = useRef(null);

  const bestSellers = globalProducts.filter(p => p.id === 101 || p.id === 301);

  const updateQuantity = (product, delta) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        const newQ = existing.quantity + delta;
        if (newQ <= 0) return prev.filter(i => i.id !== product.id);
        return prev.map(i => i.id === product.id ? { ...i, quantity: newQ } : i);
      } else if (delta > 0) {
        return [...prev, { ...product, quantity: 1 }];
      }
      return prev;
    });
  };

  const getItemQuantity = (id) => cartItems.find(i => i.id === id)?.quantity || 0;

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.proto-card');

      cards.forEach((card, i) => {
        if (i === 0) return; // Skip the first one

        // Animate previous card natively while next card scrolls into view
        gsap.to(cards[i - 1], {
          scale: 0.9,
          opacity: 0.5,
          filter: "blur(10px)",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom", // Starts when the next card enters from the bottom
            end: "top top",      // Ends when the next card reaches the top and covers the previous one
            scrub: true,
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-dark">

      {/* Card 1: Menu Highlights */}
      <div className="proto-card sticky top-0 h-screen w-full flex items-center justify-center bg-background text-dark z-10 border-b border-primary/10 overflow-hidden">
        <div className="absolute right-0 top-0 w-full h-1/3 md:h-full md:w-1/3 opacity-30 md:opacity-80 border-b md:border-l border-primary/10 select-none pointer-events-none">
          <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1200" alt="Exquisite Dessert" className="w-full h-full object-cover" />
        </div>

        <div className="w-full max-w-5xl px-8 flex flex-col md:flex-row gap-16 items-center relative z-20 md:pr-[33%]">
          <div className="w-full md:w-1/2 flex gap-4 overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800" alt="Cake 1" className="w-1/2 h-64 object-cover rounded-2xl shadow-xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
            <img src="https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=800" alt="Pastry 2" className="w-1/2 h-64 object-cover rounded-2xl shadow-xl transform rotate-3 group-hover:rotate-0 translate-y-8 transition-transform duration-500" />
          </div>
          <div className="flex-1">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-dark mb-4">Menu Highlights</h2>
            <p className="font-data text-dark/70 text-lg mb-8">Curated selections from our morning bakes. Experience the perfect lamination of our croissants and the balanced sweetness of our signature tarts.</p>
            <Link to="/menu" className="magnetic-btn bg-dark text-background px-8 py-4 text-sm font-bold tracking-wide flex items-center gap-2 inline-flex">
              <span className="relative z-10 flex items-center gap-2">Explore Full Menu <ChevronRight size={16} /></span>
              <span className="hover-layer bg-primary/80"></span>
            </Link>
          </div>
        </div>
      </div>

      {/* Card 2: Best Sellers */}
      <div className="proto-card sticky top-0 h-screen w-full flex items-center justify-center bg-primary text-background z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="absolute inset-0 w-full h-full select-none pointer-events-none overflow-hidden">
          <img src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=2000" alt="Fresh baked goods" className="w-full h-full object-cover opacity-50 mix-blend-multiply transform scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-primary via-primary/95 to-transparent"></div>
        </div>

        <div className="w-full max-w-5xl px-8 flex flex-col md:flex-row gap-16 items-center relative z-20 md:pr-[15%]">
          <div className="flex-shrink-0 grid grid-cols-2 gap-6 w-full md:w-auto relative items-center">
            {/* Soft glow behind cards to lift them off the dark background */}
            <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full -z-10 transform scale-150"></div>

            {/* Left Image Pane (Slightly lower) */}
            <Link to="/menu" className="block relative w-48 h-72 md:w-56 md:h-80 rounded-[2rem] overflow-hidden group shadow-2xl transform translate-y-8">
              <img src={bestSellers[0].image} alt={bestSellers[0].name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-500 flex items-center justify-center">
                <span className="font-heading font-bold text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">Explore <ChevronRight size={20} /></span>
              </div>
            </Link>

            {/* Right Image Pane (Slightly higher) */}
            <Link to="/menu" className="block relative w-48 h-80 md:w-56 md:h-96 rounded-[2rem] overflow-hidden group shadow-2xl transform -translate-y-8">
              <img src={bestSellers[1].image} alt={bestSellers[1].name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-500 flex items-center justify-center">
                <span className="font-heading font-bold text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">Explore <ChevronRight size={20} /></span>
              </div>
            </Link>
          </div>
          <div className="flex-1">
            <h2 className="font-heading font-bold text-5xl md:text-7xl mb-4 leading-tight">Best<br className="hidden md:block" /> Sellers</h2>
            <p className="font-data text-background/90 text-lg md:text-xl font-medium leading-relaxed">Our community's absolute favorites. From the Classic Butter Croissant that sells out by 10 AM, to our rich, decadent Dark Chocolate Truffle Cake. Secure yours now.</p>
          </div>
        </div>
      </div>

      {/* Card 3: Customer Reviews */}
      <div className="proto-card sticky top-0 h-screen w-full flex items-center justify-center bg-dark text-background z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="absolute right-0 top-0 w-full h-1/3 md:h-full md:w-1/3 opacity-20 md:opacity-30 mix-blend-luminosity select-none pointer-events-none">
          <img src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1200" alt="Cake decorating" className="w-full h-full object-cover" />
        </div>

        <div className="w-full max-w-5xl px-8 flex flex-col md:flex-row gap-16 items-center relative z-20 md:pr-[33%]">
          <div className="flex-shrink-0 grid grid-cols-2 gap-4">
            <div className="bg-background/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center shadow-xl">
              <div className="font-heading font-bold text-4xl text-accent mb-1">4</div>
              <div className="font-data text-xs tracking-widest opacity-60 uppercase">Locations</div>
            </div>
            <div className="bg-background/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center shadow-xl">
              <div className="font-heading font-bold text-4xl text-accent mb-1">4.9</div>
              <div className="font-data text-xs tracking-widest opacity-60 uppercase">Average Rating</div>
            </div>
            <div className="bg-background/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center shadow-xl col-span-2">
              <div className="font-heading font-bold text-3xl text-accent mb-1">12K+</div>
              <div className="font-data text-xs tracking-widest opacity-60 uppercase">Reviews Across the City</div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">Citywide Acclaim</h2>
            <p className="font-data text-background/80 text-lg mb-6 flex gap-2"><Star size={20} className="fill-accent text-accent mt-1 flex-shrink-0" /> <span>"The lamination on the croissants is unmatched. Truly a sanctuary for pastry lovers." — The Daily Times</span></p>
            <p className="font-data text-background/80 text-lg flex gap-2"><Star size={20} className="fill-accent text-accent mt-1 flex-shrink-0" /> <span>"Their Custom Celebration Cakes are edible masterpieces." — Local Food Guide</span></p>

            <p className="font-data text-background/80 text-lg">Submit a highly specific design request for your celebration cakes. Our master bakers execute bespoke orders with precision.</p>
          </div>
        </div>
      </div>

    </section>
  );
};

// ==============================
// 6. FOOTER
// ==============================
const Footer = () => {
  return (
    <footer className="bg-[#1C1A18] text-background rounded-t-[4rem] px-8 pt-24 pb-12 mt-0 relative z-40 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,1)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
        <div>
          <h3 className="font-heading font-bold text-3xl text-accent mb-6">My Cake Valley</h3>
          <p className="font-data opacity-60 max-w-xs">Artisan baking crafted by heritage tradition. Your daily sanctuary for laminated perfection.</p>
        </div>

        <div className="flex gap-16">
          <div className="flex flex-col gap-4">
            <h4 className="font-heading opacity-40 uppercase tracking-widest text-xs mb-2">Navigation</h4>
            <a href="#" className="font-data hover:text-accent transition-colors">Menu</a>
            <a href="#" className="font-data hover:text-accent transition-colors">Locations</a>
            <a href="#" className="font-data hover:text-accent transition-colors">Custom Request</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-heading opacity-40 uppercase tracking-widest text-xs mb-2">Legal</h4>
            <a href="#" className="font-data hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="font-data hover:text-accent transition-colors">Terms</a>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <div className="bg-dark/50 rounded-full px-6 py-3 flex items-center gap-4 border border-white/5">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-mono text-xs text-white/50 tracking-widest">SYSTEM OPERATIONAL</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex items-center justify-between opacity-50 text-sm font-data">
        <span>&copy; {new Date().getFullYear()} My Cake Valley.</span>
        <span>Built with Precision.</span>
      </div>
    </footer>
  );
}

// ==============================
// 7. CART DRAWER
// ==============================
const CartDrawer = ({ cartItems, setCartItems, isOpen, setIsOpen }) => {
  const toggleQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-background shadow-2xl z-[70] flex flex-col transition-transform duration-500 will-change-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-primary/10">
          <h2 className="font-heading text-2xl font-bold flex items-center gap-3">
            <ShoppingCart className="text-primary" />
            Your Order
          </h2>
          <button onClick={() => setIsOpen(false)} className="hover:bg-primary/10 p-2 rounded-full transition-colors flex items-center justify-center">
            <X size={24} className="text-dark/60" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <ShoppingCart size={48} className="mb-4" />
              <p className="font-data text-lg">Your cart is empty.</p>
              <button onClick={() => setIsOpen(false)} className="mt-4 text-primary underline underline-offset-4">Continue Browsing</button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-2xl shadow-sm border border-primary/5">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-1">
                  <h4 className="font-heading font-bold text-lg mb-1 leading-none">{item.name}</h4>
                  <div className="font-data text-primary font-bold mb-3">${item.price.toFixed(2)}</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-background rounded-full border border-primary/20">
                      <button onClick={() => { if (item.quantity === 1) removeItem(item.id); else toggleQuantity(item.id, -1); }} className="p-1 hover:bg-primary/10 rounded-full">
                        {item.quantity === 1 ? <Trash2 size={16} className="text-red-500" /> : <Minus size={16} />}
                      </button>
                      <span className="font-mono text-sm w-8 text-center">{item.quantity}</span>
                      <button onClick={() => toggleQuantity(item.id, 1)} className="p-1 hover:bg-primary/10 rounded-full">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-primary/10 bg-white">
            <div className="flex justify-between font-heading font-bold text-xl mb-6">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="magnetic-btn w-full bg-primary text-background py-4 flex items-center justify-center font-bold tracking-wide rounded-2xl shadow-xl">
              <span className="relative z-10 flex items-center gap-2">Proceed to Checkout <ChevronRight size={20} /></span>
              <span className="hover-layer bg-dark/20"></span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// ==============================
// 8. MENU SECTION
// ==============================
const MenuSection = ({ cartItems, setCartItems }) => {
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All Items', 'Cakes', 'Pastries', 'Croissants', 'Cupcakes', 'Artisan Breads'];

  const filteredProducts = activeCategory === 'All Items'
    ? globalProducts
    : globalProducts.filter(p => p.category === activeCategory);

  // Cart Helpers
  const getItemQuantity = (id) => cartItems.find(i => i.id === id)?.quantity || 0;

  const updateQuantity = (product, delta) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        const newQ = existing.quantity + delta;
        if (newQ <= 0) return prev.filter(i => i.id !== product.id);
        return prev.map(i => i.id === product.id ? { ...i, quantity: newQ } : i);
      } else if (delta > 0) {
        return [...prev, { ...product, quantity: 1 }];
      }
      return prev;
    });
  };

  return (
    <section id="menu" className="py-24 px-6 bg-background relative border-t border-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-5xl md:text-6xl text-dark mb-4">Our Menu</h2>
          <p className="font-data text-dark/60 text-lg max-w-xl mx-auto">Explore our carefully curated selection of daily bakes, intricate pastries, and celebration centerpieces.</p>
        </div>

        {/* Categories Sub-nav */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-data font-bold text-sm tracking-wide px-6 py-3 rounded-full transition-all duration-300 ${activeCategory === cat ? 'bg-primary text-background shadow-lg scale-105' : 'bg-transparent text-dark border border-primary/20 hover:border-primary/50'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map(product => {
            const quantity = getItemQuantity(product.id);
            return (
              <div key={product.id} className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-primary/5 group cursor-pointer" onClick={() => setSelectedProduct(product)}>
                <div className="w-full h-64 rounded-xl overflow-hidden mb-6 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold font-data flex items-center gap-1 shadow-md">
                    <Star size={12} className="fill-primary text-primary" /> {product.rating}
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-heading font-bold text-2xl group-hover:text-primary transition-colors">{product.name}</h3>
                  <span className="font-data font-bold text-xl text-primary">${product.price.toFixed(2)}</span>
                </div>
                <p className="font-data text-dark/60 text-sm line-clamp-2 mb-6">{product.desc}</p>

                {/* Prevent click bubbling for Add Button inside the card wrapper */}
                <div onClick={(e) => e.stopPropagation()}>
                  {quantity > 0 ? (
                    <div className="flex items-center justify-between bg-primary/10 rounded-full border border-primary/20 overflow-hidden">
                      <button onClick={() => updateQuantity(product, -1)} className="p-3 hover:bg-primary/20 transition-colors w-1/3 flex justify-center"><Minus size={20} className="text-primary" /></button>
                      <span className="font-mono font-bold text-primary w-1/3 text-center">{quantity}</span>
                      <button onClick={() => updateQuantity(product, 1)} className="p-3 hover:bg-primary/20 transition-colors w-1/3 flex justify-center"><Plus size={20} className="text-primary" /></button>
                    </div>
                  ) : (
                    <button onClick={() => updateQuantity(product, 1)} className="w-full bg-background border border-primary/30 text-dark hover:bg-primary hover:text-background py-3 rounded-full font-bold transition-colors font-data tracking-wide">
                      Add to Order
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-background rounded-[3rem] w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row transform scale-100 transition-transform">
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedProduct(null)} className="absolute top-6 left-6 md:hidden bg-background/50 backdrop-blur-md p-2 rounded-full text-dark hover:bg-background">
                <X size={24} />
              </button>
            </div>
            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white relative">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 hidden md:flex text-dark/50 hover:text-dark transition-colors p-2 hover:bg-primary/10 rounded-full">
                <X size={24} />
              </button>

              <div className="text-primary font-mono text-sm tracking-widest uppercase mb-4">{selectedProduct.category}</div>
              <h2 className="font-heading font-bold text-4xl mb-4 leading-tight">{selectedProduct.name}</h2>

              <div className="flex items-center gap-4 mb-6 text-sm font-data">
                <div className="flex items-center gap-1 text-yellow-500"><Star size={18} className="fill-yellow-500" /> <span className="text-dark font-bold">{selectedProduct.rating}</span></div>
                <div className="text-dark/40 border-l border-dark/10 pl-4">{selectedProduct.reviews} customer reviews</div>
              </div>

              <p className="font-data text-dark/70 text-lg leading-relaxed mb-8">{selectedProduct.desc}</p>

              <div className="flex items-center justify-between mb-8">
                <span className="font-heading font-bold text-4xl text-primary">${selectedProduct.price.toFixed(2)}</span>
              </div>

              <div className="mt-auto">
                {getItemQuantity(selectedProduct.id) > 0 ? (
                  <div className="flex items-center justify-between bg-primary/10 rounded-2xl border border-primary/20 overflow-hidden h-14">
                    <button onClick={() => updateQuantity(selectedProduct, -1)} className="h-full px-6 hover:bg-primary/20 transition-colors flex items-center justify-center"><Minus size={24} className="text-primary" /></button>
                    <span className="font-mono font-bold text-xl text-primary">{getItemQuantity(selectedProduct.id)}</span>
                    <button onClick={() => updateQuantity(selectedProduct, 1)} className="h-full px-6 hover:bg-primary/20 transition-colors flex items-center justify-center"><Plus size={24} className="text-primary" /></button>
                  </div>
                ) : (
                  <button onClick={() => updateQuantity(selectedProduct, 1)} className="w-full bg-primary text-background py-4 rounded-2xl font-bold font-data text-lg hover:shadow-xl hover:scale-[1.02] transition-all tracking-wide flex justify-center items-center gap-2">
                    <ShoppingCart size={20} /> Add to Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ==============================
// MAIN APP COMPONENT & ROUTER
// ==============================
function Home({ cartItems, setCartItems }) {
  return (
    <>
      <Hero />
      <Features />
      <Philosophy />
      {/* Passes down cart logic inside Protocol to add items for Best Sellers */}
      <ProtocolStack cartItems={cartItems} setCartItems={setCartItems} />
    </>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <main className="bg-background min-h-screen text-dark selection:bg-primary selection:text-background w-full overflow-x-hidden">
        {/* Global CSS handles noise */}
        <Navbar cartItems={cartItems} setIsCartOpen={setIsCartOpen} />
        <CartDrawer cartItems={cartItems} setCartItems={setCartItems} isOpen={isCartOpen} setIsOpen={setIsCartOpen} />

        <Routes>
          <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/menu" element={<MenuSection cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>

        <div className="bg-dark">
          <Footer />
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
