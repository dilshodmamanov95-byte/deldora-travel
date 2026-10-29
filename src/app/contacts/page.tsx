'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, MessageSquare, Instagram } from 'lucide-react';

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    
    // Reset submitted state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contacts = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Телефон',
      description: '+998 (99) 123-45-67',
      href: 'tel:+998991234567',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Дополнительный телефон',
      description: '+998 (90) 987-65-43',
      href: 'tel:+998909876543',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      description: 'info@deldora-travel.uz',
      href: 'mailto:info@deldora-travel.uz',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Адрес',
      description: 'г. Ташкент, ул. Амира Темура 100, офис 201',
      href: 'https://goo.gl/maps/example',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Режим работы',
      description: 'Пн-Пт: 09:00-19:00, Сб: 10:00-16:00',
    },
  ];

  const socialLinks = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'WhatsApp',
      href: 'https://wa.me/+998991234567',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Telegram',
      href: 'https://t.me/deldora_travel_uz',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      title: 'Instagram',
      href: 'https://instagram.com/deldora.travel',
      color: 'bg-pink-500 hover:bg-pink-600',
    },
  ];

  const faq = [
    {
      question: 'Как забронировать тур?',
      answer: 'Вы можете забронировать тур онлайн на нашем сайте, позвонить нам по телефону или написать на email. Наши менеджеры свяжутся с вами для уточнения деталей.',
    },
    {
      question: 'Какие документ нужны для поездки за рубеж?',
      answer: 'Для поездок за рубеж вам понадобится загранпаспорт, виза (в зависимости от страны), и иногда дополнительные документы. Мы поможем вам с оформлением визы.',
    },
    {
      question: 'Можно ли изменить дату поездки?',
      answer: 'Да, мы можем изменить дату поездки в зависимости от доступности мест и условий авиаперевозчиков. Пожалуйста, свяжитесь с нами заранее.',
    },
    {
      question: 'Что входит в стоимость тура?',
      answer: 'В стоимость тура обычно входит: трансферы, размещение, питание (согласно программе), экскурсионное обслуживание, входные билеты. Подробную информацию вы можете уточнить у нашего менеджера.',
    },
    {
      question: 'Можно ли оплатить тур в рассрочку?',
      answer: 'Да, мы предлагаем оплату тура в рассрочку без процентов. Уточните детали у нашего менеджера.',
    },
    {
      question: 'Что делать, если я хочу отменить тур?',
      answer: 'Вы можете отменить тур согласно нашим правилам отмены. Ознакомиться с правилами вы можете в договоре или уточнить у нашего менеджера.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-64 bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Контакты
          </h1>
          <p className="text-xl">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Cards */}
            <div className="space-y-6">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gold-100"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500">
                      {contact.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{contact.title}</h3>
                      {contact.href ? (
                        <Link
                          href={contact.href}
                          className="text-gold-500 hover:text-gold-600 transition-colors"
                        >
                          {contact.description}
                        </Link>
                      ) : (
                        <p className="text-gray-600">{contact.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gold-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Мы в социальных сетях
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all ${link.color}`}
                    >
                      {link.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Напишите нам
              </h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 rounded-xl p-6 text-center">
                  <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-bold text-green-600 mb-2">
                    Сообщение отправлено!
                  </h3>
                  <p className="text-green-500">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Введите ваше имя"
                      className="w-full px-4 py-3 border border-gold-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Введите ваш email"
                      className="w-full px-4 py-3 border border-gold-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Введите ваш телефон"
                      className="w-full px-4 py-3 border border-gold-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                      Сообщение
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Введите ваше сообщение"
                      rows={5}
                      className="w-full px-4 py-3 border border-gold-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-gold-400 to-gold-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-gold-500 hover:to-gold-700 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Отправка...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Отправить сообщение</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Наше местоположение
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {/* Placeholder for map */}
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg">Карта Google Maps</p>
                <p className="text-sm">г. Ташкент, ул. Амира Темура 100</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
            Часто задаваемые вопросы
          </h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {faq.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gold-100"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-start">
                  <span className="w-8 h-8 bg-gold-500/10 rounded-lg flex items-center justify-center text-gold-500 mr-3 text-sm">
                    {index + 1}
                  </span>
                  {item.question}
                </h3>
                <p className="text-gray-600 pl-11">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-gold-500 to-gold-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы отправиться в путешествие?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Мы с радостью ответим на все ваши вопросы
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="tel:+998991234567"
              className="inline-block bg-white text-gold-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              Позвонить нам
            </Link>
            <Link
              href="/tours"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Посмотреть туры
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
