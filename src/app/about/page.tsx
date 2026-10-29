import Link from 'next/link';
import { Award, Building2, Users, Heart, Globe, Star, Calendar } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { number: '8+', label: 'Лет опыта', icon: <Calendar className="w-8 h-8" /> },
    { number: '1000+', label: 'Довольных клиентов', icon: <Heart className="w-8 h-8" /> },
    { number: '50+', label: 'Направлений', icon: <Globe className="w-8 h-8" /> },
    { number: '99%', label: 'Удовлетворенность', icon: <Star className="w-8 h-8" /> },
  ];

  const teamMembers = [
    {
      name: 'Ильхом Таджибаев',
      position: 'Основатель и генеральный директор',
      description: 'Опыт работы в туристической отрасли более 15 лет',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Дилшод Рахимов',
      position: 'Менеджер по международным направлениям',
      description: 'Эксперт по турциям в Турцию, ОАЭ, Таиланд',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Гульнара Юлдашева',
      position: 'Менеджер по внутреннему туризму',
      description: 'Специалист по турам по Узбекистану',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Рустам Усманов',
      position: 'Старший гид',
      description: 'Профессиональный гид с 10-летним опытом',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const whyChooseUs = [
    {
      title: 'Профессионализм',
      description: 'Наша команда состоит из опытных специалистов с многолетним стажем в туристической отрасли.',
      icon: <Award className="w-8 h-8" />,
    },
    {
      title: 'Индивидуальный подход',
      description: 'Мы подходим к каждому клиенту индивидуально и разрабатываем уникальные маршруты.',
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: 'Надежность',
      description: 'Мы работаем только с проверенными партнерами и гарантируем качественный сервис.',
      icon: <Building2 className="w-8 h-8" />,
    },
    {
      title: 'Лучшие цены',
      description: 'Благодаря прямым контрактам с отелями и авиакомпаниями, мы предлагаем лучшие цены.',
      icon: <Heart className="w-8 h-8" />,
    },
    {
      title: 'Поддержка 24/7',
      description: 'Наша служба поддержки всегда готова помочь вам в любое время суток.',
      icon: <Globe className="w-8 h-8" />,
    },
    {
      title: 'Опыт',
      description: 'За годы работы мы накопили огромный опыт и знания, которые помогают нам создавать идеальные путешествия.',
      icon: <Star className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-64 bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            О нас
          </h1>
          <p className="text-xl">
            Узнайте больше о компании Deldora Travel
          </p>
        </div>
      </section>

      {/* About Company */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop"
                alt="Офис Deldora Travel"
                className="w-full rounded-2xl shadow-xl"
                loading="lazy"
              />
            </div>
            <div>
              <span className="inline-block px-4 py-1 bg-gold-100 text-gold-600 text-sm font-medium rounded-full mb-4">
                О КОМПАНИИ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Deldora Travel - Ваш проводник в мир путешествий
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Deldora Travel - это ведущее туристическое агентство Узбекистана, специализирующееся на 
                организации индивидуальных и групповых туров как по Узбекистану, так и за рубежом.
              </p>
              <p className="text-gray-600 mb-6">
                Мы начали свою деятельность в 2015 году с kleinen команды энтузиастов, и за это время 
                смогли завоевать доверие тысяч клиентов. Сегодня Deldora Travel - это команда 
                профессионалов, которые с любовью и заботой подходят к организации каждого путешествия.
              </p>
              <p className="text-gray-600 mb-8">
                Наша миссия - сделать путешествия доступными и запоминающимися для каждого. Мы 
                верим, что путешествия обогащают жизнь, расширяют кругозор и помогают узнать мир 
                во всем его многообразии.
              </p>
              <Link
                href="/contacts"
                className="inline-block bg-gradient-to-r from-gold-400 to-gold-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-gold-500 hover:to-gold-700 transition-all shadow-lg"
              >
                Связаться с нами
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gold-500">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold text-gold-500 mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-gold-100 text-gold-600 text-sm font-medium rounded-full mb-3">
              ПОЧЕМУ МЫ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Почему выбирают Deldora Travel
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Мы делаем все возможное, чтобы ваше путешествие было идеальным
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center mb-4 text-gold-500">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-gold-100 text-gold-600 text-sm font-medium rounded-full mb-3">
              НАША КОМАНДА
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Знакомьтесь с нашей командой
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Наши специалисты делают все возможное, чтобы ваше путешествие было комфортным
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-gold-500 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-gold-100 text-gold-600 text-sm font-medium rounded-full mb-3">
              ПАРТНЕРЫ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Наши партнеры
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Мы работаем только с проверенными и надежными партнерами
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Партнер {item}</h3>
                  <p className="text-gray-500 text-sm">Описание партнера</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licenses and Certificates */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
            Лицензии и сертификаты
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-20 h-20 bg-gold-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-gold-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Лицензия #{item}
                </h3>
                <p className="text-gray-500 text-sm">
                  Описание лицензии или сертификата
                </p>
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
            Доверьтесь профессионалам Deldora Travel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours"
              className="inline-block bg-white text-gold-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              Посмотреть туры
            </Link>
            <Link
              href="/contacts"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
