import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Using 'chart.js/auto' for Chart.js v3+ for tree-shaking support

interface SectorData {
    title: string;
    icon: string;
    description: string;
    avenues: string[];
    players: string[];
    metrics: number[];
}

interface StrategyData {
    risk: number;
    reward: number;
}

interface PortfolioData {
    labels: string[];
    data: number[];
    tip: string;
}

interface SectorDataMap {
    [key: string]: SectorData;
}

interface StrategyDataMap {
    [key: string]: StrategyData;
}

interface PortfolioDataMap {
    [key: string]: PortfolioData;
}

const IndianTitans: React.FC = () => {
    // State Management
    const [currentSector, setCurrentSector] = useState('ai');
    const [currentView, setCurrentView] = useState<'avenues' | 'players'>('avenues');
    const [currentPortfolioProfile, setCurrentPortfolioProfile] = useState('balanced');

    const sectorRadarChartRef = useRef<HTMLCanvasElement>(null);
    const strategyBarChartRef = useRef<HTMLCanvasElement>(null);
    const portfolioDonutChartRef = useRef<HTMLCanvasElement>(null);

    // Chart.js instances
    const radarChartInstance = useRef<Chart | null>(null);
    const barChartInstance = useRef<Chart | null>(null);
    const donutChartInstance = useRef<Chart | null>(null);

    // Data for Sectors
    const sectorData: SectorDataMap = {
        ai: {
            title: "Artificial Intelligence & Machine Learning (AI & ML)",
            icon: "🧠",
            description: "Artificial Intelligence (AI) and Machine Learning (ML) are fundamentally reshaping industries worldwide. In India, AI is rapidly moving from academic labs to real-world applications, promising to revolutionize healthcare diagnostics, financial fraud detection, agricultural yield prediction, and personalized e-commerce experiences. It infuses intelligence into every other industry, making it a prime candidate for generating the next wave of wealth.",
            avenues: [
                "Pure-Play AI Software and Solutions Providers: Companies specializing in developing AI algorithms, platforms, and specific AI applications (e.g., Natural Language Processing (NLP) solutions, computer vision software).",
                "Companies Leveraging AI as a Core Competitive Advantage: Businesses in traditional sectors that are deeply embedding AI into their products or operations, making it central to their value proposition (e.g., a logistics company using AI for route optimization).",
                "AI-driven Hardware Manufacturers: Companies developing specialized AI chips (e.g., GPUs, TPUs) or AI-enabled devices (e.g., robotics, smart sensors) that power AI applications.",
                "Data Analytics and Data Infrastructure Companies: AI thrives on data. Companies that provide services for data collection, cleaning, storage, and analytics are crucial enablers of the AI ecosystem, including cloud providers and data warehousing solutions."
            ],
            players: [
                "IT Services giants with dedicated AI divisions or aggressive AI capability building (e.g., TCS, Infosys, Wipro).",
                "Fintech companies utilizing AI for credit scoring, fraud detection, and personalized financial advice.",
                "Healthcare providers implementing AI for diagnostics and drug discovery.",
                "E-commerce platforms employing AI for recommendation engines and personalized shopping.",
                "Startups focusing purely on AI solutions, attracting significant venture capital funding (e.g., in conversational AI, computer vision)."
            ],
            metrics: [8, 9, 6, 9, 7, 8]
        },
        renewables: {
            title: "Renewable Energy & Green Technologies",
            icon: "☀️",
            description: "India is on an ambitious journey to transform its energy landscape, rapidly shifting from fossil fuels to clean, green energy sources. This transition is not just an environmental imperative; it's an economic mega-trend, driven by climate commitments, energy security concerns, and declining costs of renewable technologies, poised to create immense wealth and new 'titans' in the process.",
            avenues: [
                "Renewable Energy Generators/Developers: Companies that develop, own, and operate solar farms, wind farms, and other renewable energy projects, often with long-term power purchase agreements (PPAs).",
                "Equipment Manufacturers: Companies that produce solar panels, inverters, wind turbines, blades, and other key components for renewable energy installations. 'Make in India' initiatives are boosting domestic manufacturing here.",
                "Energy Storage Solutions: As renewables are intermittent, energy storage (primarily battery storage) is crucial for grid stability. Companies involved in battery manufacturing (especially Lithium-ion) and grid-scale storage solutions.",
                "Green Hydrogen Producers & Technology Providers: An emerging technology for decarbonizing hard-to-abate sectors like heavy industry and shipping, with India pushing for a global hub status."
            ],
            players: [
                "Large power generation companies diversifying into renewables (e.g., Adani Green Energy, ReNew Power).",
                "Manufacturers of solar PV modules and wind turbines (e.g., Waaree Energies, Suzlon).",
                "Companies developing advanced battery technologies and setting up gigafactories.",
                "Emerging players in the Green Hydrogen production and electrolysis technology space."
            ],
            metrics: [9, 7, 9, 6, 8, 9]
        },
        ev: {
            title: "Electric Vehicles (EVs) & E-Mobility",
            icon: "🚗",
            description: "India is embracing the electric vehicle revolution with remarkable speed, driven by concerns over air pollution, rising fuel import bills, and a global push for sustainable transportation. This shift to e-mobility is creating an entirely new ecosystem, from manufacturing to charging infrastructure, offering fertile ground for the next generation of industrial titans.",
            avenues: [
                "EV Manufacturers (OEMs): Companies designing and assembling electric cars, two-wheelers, three-wheelers, buses, and commercial vehicles. This includes both established automakers diversifying and new EV-only players.",
                "Battery Manufacturers & Technology: The heart of an EV. Companies involved in Lithium-ion cell manufacturing, battery pack assembly, battery management systems (BMS), and research into next-generation battery chemistries.",
                "Charging Infrastructure Providers: Companies building, operating, and maintaining public and private EV charging networks, including hardware manufacturers and software platforms.",
                "Component Suppliers: Companies producing electric powertrains (motors, inverters, controllers), specialized EV chassis, lightweight materials, and advanced electronics specific to EVs."
            ],
            players: [
                "Established auto giants with aggressive EV roadmaps (e.g., Tata Motors, Mahindra & Mahindra, Bajaj Auto for 2/3 wheelers).",
                "New-age EV players and startups (e.g., Ola Electric, Ather Energy).",
                "Battery manufacturers and companies benefiting from PLI schemes for ACC battery production.",
                "Companies deploying public charging stations (e.g., Tata Power, Fortum, ChargeGrid)."
            ],
            metrics: [8, 7, 8, 7, 9, 7]
        },
        fintech: {
            title: "Fintech & Digital Payments",
            icon: "💳",
            description: "India has undergone a silent revolution in its financial services landscape, largely driven by the explosive growth of Fintech and digital payments. UPI has become a global benchmark, facilitating billions of transactions monthly, not only democratizing access to financial services but also opening up unprecedented opportunities for investors.",
            avenues: [
                "Listed Digital Payment Companies: Companies that own and operate payment gateways, mobile wallets, or are key players in the UPI ecosystem.",
                "Traditional Banks & NBFCs (Non-Banking Financial Companies) with Strong Digital Focus: Established financial institutions aggressively investing in digital transformation, launching their own Fintech products, or partnering with startups.",
                "Fintech SaaS (Software as a Service) Providers: Companies that offer software solutions to other Fintech firms or traditional financial institutions (e.g., core banking software, fraud detection tools).",
                "Listed InsurTech and WealthTech Platforms: Companies that are pure-play digital distributors of insurance or investment products, or those using technology to offer innovative solutions."
            ],
            players: [
                "Payment gateway operators (e.g., Paytm, PhonePe, Razorpay).",
                "Major private sector banks leading in digital adoption (e.g., HDFC Bank, ICICI Bank).",
                "Digital lending platforms and NBFCs leveraging data for credit assessment.",
                "Wealth management platforms and discount brokers (e.g., Zerodha, Groww).",
                "Well-funded unlisted Fintech startups signaling future public market opportunities."
            ],
            metrics: [9, 9, 7, 8, 7, 8]
        },
        deeptech: {
            title: "Deep Tech & Frontier Technologies",
            icon: "🔬",
            description: "Deep Tech refers to technology based on tangible scientific discoveries or engineering innovations that have the potential to create entirely new industries or revolutionize multiple existing ones. These are often characterized by long R&D cycles, high capital intensity, but offer immense, often exponential, returns if successful.",
            avenues: [
                "Venture Capital Funds: The most practical way to invest for the average investor is through VC funds that specifically focus on this sector, pooling money across a portfolio of startups.",
                "Listed Companies with Significant R&D in Frontier Technologies: Look for larger, established companies (e.g., in pharmaceuticals, specialty chemicals, IT services, defense, manufacturing) publicly investing heavily in R&D for Deep Tech applications.",
                "Biotechnology & Synthetic Biology Firms: Engineering biological systems for applications in medicine (new drugs, gene therapies), agriculture, and industrial processes.",
                "Advanced Materials Developers: Companies creating new materials with superior properties (e.g., stronger, lighter, more conductive) for aerospace, electronics, and energy."
            ],
            players: [
                "Premier research institutions and their spin-off companies (e.g., IITs, IISc).",
                "Pharmaceutical and life sciences companies involved in novel drug discovery or gene therapies.",
                "Specialty chemical manufacturers developing advanced materials.",
                "Niche companies in areas like quantum computing research, robotics, or advanced sensors."
            ],
            metrics: [6, 9, 4, 10, 5, 6]
        },
        agritech: {
            title: "Sustainable Agriculture & Agritech",
            icon: "🌱",
            description: "Agriculture is the backbone of the Indian economy. The convergence of technology and agriculture (Agritech), coupled with a focus on sustainability, is poised to revolutionize this vital sector, creating opportunities for increased productivity, higher farmer incomes, and new avenues for wealth creation.",
            avenues: [
                "Agritech Startups: Innovating in areas like precision farming (sensors, drones), farm automation, supply chain optimization, and digital marketplaces for farmers.",
                "Companies in Food Processing & Value-Added Products: As incomes rise, demand for processed, packaged, and value-added food products increases. Look for companies integrating sustainable sourcing practices.",
                "Agri-Input Providers with a Sustainable Focus: Traditional companies manufacturing seeds, fertilizers, and pesticides that are increasingly investing in organic inputs, bio-fertilizers, or drone-based spraying solutions.",
                "Micro-Irrigation & Water Management Companies: Firms providing drip irrigation systems, sprinklers, and other water-saving technologies, crucial for sustainable farming."
            ],
            players: [
                "Companies providing farm management software and IoT devices for real-time agricultural insights.",
                "Online platforms connecting farmers directly with markets or input suppliers (B2B agri marketplaces).",
                "Biotech companies developing advanced seeds or bio-pesticides for sustainable farming.",
                "Logistics and cold chain infrastructure providers focused on reducing post-harvest losses.",
                "Companies in sustainable aquaculture and animal husbandry technologies."
            ],
            metrics: [7, 6, 8, 6, 8, 7]
        },
        space: {
            title: "Space Tech & Defense Manufacturing",
            icon: "🚀",
            description: "India's ambitions are not confined to Earth. With a robust space program and a strong push for defense indigenization, the Space Tech and Defense Manufacturing sectors are emerging as strategic avenues for growth and innovation. Once dominated by government entities, these sectors are increasingly opening up to private participation, creating unprecedented opportunities.",
            avenues: [
                "Listed Defense Public Sector Undertakings (DPSUs): Companies like Hindustan Aeronautics Limited (HAL) and Bharat Electronics Limited (BEL) benefiting directly from indigenization policies and increased orders.",
                "Private Sector Companies with Defense Contracts: A growing number of private Indian companies securing significant defense contracts, often in collaboration with global defense majors or independently.",
                "Ancillary & Component Suppliers to Defense: Companies providing specialized components, materials, or services to larger defense manufacturers.",
                "Space-Focused Technology Companies: Companies involved in satellite manufacturing, launch services, ground segment operations, and space-based applications leveraging the opening up of the space sector to private players."
            ],
            players: [
                "Major DPSUs: HAL, BEL, Mazagon Dock Shipbuilders, Bharat Dynamics Limited.",
                "Private Indian conglomerates with defense divisions (e.g., Tata Advanced Systems, L&T Defense).",
                "Space tech startups like Skyroot Aerospace (launch vehicles), Agnikul Cosmos (launch vehicles), and Pixxel (earth observation satellites).",
                "Companies providing specialized electronics, avionics, and materials for defense and space applications."
            ],
            metrics: [7, 8, 9, 7, 9, 9]
        },
    };

    const strategyData: StrategyDataMap = {
        direct: { risk: 8, reward: 9 },
        mutual: { risk: 5, reward: 6 },
        startup: { risk: 10, reward: 10 }
    };

    const portfolioData: PortfolioDataMap = {
        conservative: {
            labels: ['Renewables', 'Fintech', 'Agritech', 'EVs'],
            data: [40, 30, 20, 10],
            tip: "For a conservative approach, focus on established companies within high-growth sectors, consider large-cap funds, and ensure ample diversification across stable and emerging assets to minimize volatility."
        },
        balanced: {
            labels: ['Renewables', 'Fintech', 'EVs', 'AI', 'Space/Defense'],
            data: [25, 25, 20, 15, 15],
            tip: "A balanced portfolio should blend stable growth with higher-risk emerging opportunities. Diversify across a mix of direct equities in promising mid-cap companies, sectoral mutual funds, and potentially small, indirect exposure to startups, maintaining a medium-term horizon."
        },
        aggressive: {
            labels: ['AI', 'Deep Tech', 'EVs', 'Fintech', 'Space/Defense'],
            data: [30, 25, 20, 15, 10],
            tip: "An aggressive portfolio thrives on high conviction in revolutionary technologies. Diversify across multiple early-stage or rapidly scaling companies, potentially through thematic ETFs or venture capital funds, embracing higher volatility for outsized long-term returns. Rebalance frequently to manage risk."
        }
    };

    // Initialize Radar Chart
    useEffect(() => {
        if (sectorRadarChartRef.current && !radarChartInstance.current) {
            const ctx = sectorRadarChartRef.current.getContext('2d');
            if (ctx) {
                radarChartInstance.current = new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: ['Market Size', 'Growth Rate', 'Risk Level', 'Innovation', 'Government Support', 'Global Demand'],
                        datasets: [{
                            label: 'Sector Profile',
                            data: sectorData[currentSector].metrics,
                            backgroundColor: 'rgba(59, 130, 246, 0.2)',
                            borderColor: 'rgba(59, 130, 246, 1)',
                            borderWidth: 2,
                            pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(59, 130, 246, 1)'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            r: {
                                beginAtZero: true,
                                max: 10,
                                ticks: {
                                    stepSize: 2
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            }
        }
    }, []);

    // Update Radar Chart when sector changes
    useEffect(() => {
        if (radarChartInstance.current) {
            radarChartInstance.current.data.datasets[0].data = sectorData[currentSector].metrics;
            radarChartInstance.current.update();
        }
    }, [currentSector]);

    // Initialize Bar Chart
    useEffect(() => {
        if (strategyBarChartRef.current && !barChartInstance.current) {
            const ctx = strategyBarChartRef.current.getContext('2d');
            if (ctx) {
                barChartInstance.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Risk', 'Reward'],
                        datasets: [{
                            label: 'Strategy Profile',
                            data: [strategyData.direct.risk, strategyData.direct.reward],
                            backgroundColor: [
                                'rgba(239, 68, 68, 0.8)',
                                'rgba(34, 197, 94, 0.8)'
                            ],
                            borderColor: [
                                'rgba(239, 68, 68, 1)',
                                'rgba(34, 197, 94, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 10
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            }
        }
    }, []);

    // Initialize Donut Chart
    useEffect(() => {
        if (portfolioDonutChartRef.current && !donutChartInstance.current) {
            const ctx = portfolioDonutChartRef.current.getContext('2d');
            if (ctx) {
                donutChartInstance.current = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: portfolioData[currentPortfolioProfile].labels,
                        datasets: [{
                            data: portfolioData[currentPortfolioProfile].data,
                            backgroundColor: [
                                'rgba(59, 130, 246, 0.8)',
                                'rgba(16, 185, 129, 0.8)',
                                'rgba(245, 158, 11, 0.8)',
                                'rgba(239, 68, 68, 0.8)',
                                'rgba(139, 92, 246, 0.8)'
                            ],
                            borderWidth: 2,
                            borderColor: '#fff'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
            }
        }
    }, []);

    // Update Donut Chart when profile changes
    useEffect(() => {
        if (donutChartInstance.current) {
            donutChartInstance.current.data.labels = portfolioData[currentPortfolioProfile].labels;
            donutChartInstance.current.data.datasets[0].data = portfolioData[currentPortfolioProfile].data;
            donutChartInstance.current.update();
        }
    }, [currentPortfolioProfile]);

    // JSX for the component
    return (
        <div className="bg-gray-50">
            <main className="container mx-auto px-4 py-8 md:py-12">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">The Next Indian Titans</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
                        An interactive guide to investing in the sectors shaping tomorrow's billionaires.
                    </p>
                </header>

                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">The Premise: Why Now?</h2>
                    <p className="text-center mb-10 max-w-4xl mx-auto text-gray-600">
                        India is undergoing an economic renaissance, moving from an emerging market to a global powerhouse. 
                        This section summarizes the key drivers behind this growth and the lessons we can learn from today's industrial titans. 
                        Their journeys provide a blueprint for identifying future opportunities.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                            <h3 className="font-bold text-xl mb-2 text-teal-700">Ambani (Reliance)</h3>
                            <p className="text-gray-700">
                                <strong className="block mb-2 text-gray-900">Lesson:</strong> 
                                Identify core needs (energy, data), build integrated ecosystems, and pivot fearlessly into the next big wave.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                            <h3 className="font-bold text-xl mb-2 text-teal-700">Adani (Adani Group)</h3>
                            <p className="text-gray-700">
                                <strong className="block mb-2 text-gray-900">Lesson:</strong> 
                                Focus on foundational infrastructure. Aggregate assets in sectors critical to national development, from ports to green energy.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                            <h3 className="font-bold text-xl mb-2 text-teal-700">Premji (Wipro)</h3>
                            <p className="text-gray-700">
                                <strong className="block mb-2 text-gray-900">Lesson:</strong> 
                                Recognize and capitalize on nascent global trends. Execute visionary pivots, like moving from vegetable oils to IT services.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                            <h3 className="font-bold text-xl mb-2 text-teal-700">Murthy (Infosys)</h3>
                            <p className="text-gray-700">
                                <strong className="block mb-2 text-gray-900">Lesson:</strong> 
                                Build on strong values and corporate governance. Leverage India's talent pool to create a global services empire.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">The Investment Avenues</h2>
                    <p className="text-center mb-10 max-w-4xl mx-auto text-gray-600">
                        These are the sectors where the next generation of Indian billionaires will emerge. 
                        Each represents a convergence of technological advancement, government support, and market demand.
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Object.entries(sectorData).map(([key, sector]) => (
                            <div
                                key={key}
                                className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                                    currentSector === key ? 'ring-2 ring-indigo-500 bg-indigo-50' : 'bg-white'
                                }`}
                                onClick={() => setCurrentSector(key)}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="text-4xl mr-4">
                                        {sector.icon}
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-900">{sector.title}</h3>
                                </div>
                                <p className="text-gray-700 mb-4">{sector.description}</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Market Size:</span>
                                        <span className="font-semibold text-gray-900">{sector.metrics[0]}/10</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Growth Rate:</span>
                                        <span className="font-semibold text-green-600">{sector.metrics[1]}/10</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Risk Level:</span>
                                        <span className="font-semibold text-red-600">{sector.metrics[2]}/10</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Sector Analysis Dashboard</h2>
                    <p className="text-center mb-10 max-w-4xl mx-auto text-gray-600">
                        Interactive charts showing the comparative analysis of different sectors based on key metrics.
                    </p>
                    
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">Sector Comparison Radar</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <canvas ref={sectorRadarChartRef} className="w-full h-64"></canvas>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">Investment Strategy Analysis</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <canvas ref={strategyBarChartRef} className="w-full h-64"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Key Players & Opportunities</h2>
                    <p className="text-center mb-10 max-w-4xl mx-auto text-gray-600">
                        Discover the companies and startups that are leading the charge in each sector.
                    </p>
                    
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="flex space-x-4 mb-6">
                            <button
                                onClick={() => setCurrentView('avenues')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    currentView === 'avenues'
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Investment Avenues
                            </button>
                            <button
                                onClick={() => setCurrentView('players')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    currentView === 'players'
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Key Players
                            </button>
                        </div>
                        
                        {currentView === 'avenues' ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sectorData[currentSector].avenues.map((avenue, index) => (
                                    <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                        <h3 className="font-bold text-lg mb-2 text-gray-900">{avenue}</h3>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sectorData[currentSector].players.map((player, index) => (
                                    <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                        <h3 className="font-bold text-lg mb-2 text-gray-900">{player}</h3>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Portfolio Construction</h2>
                    <p className="text-center mb-10 max-w-4xl mx-auto text-gray-600">
                        Build a diversified portfolio based on your risk tolerance and investment goals.
                    </p>
                    
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">Portfolio Allocation</h3>
                                <div className="space-y-4 mb-6">
                                    {Object.entries(portfolioData).map(([profile, data]) => (
                                        <button
                                            key={profile}
                                            onClick={() => setCurrentPortfolioProfile(profile)}
                                            className={`w-full p-4 rounded-lg text-left transition-colors ${
                                                currentPortfolioProfile === profile
                                                    ? 'bg-indigo-100 border-2 border-indigo-500'
                                                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                                            }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{profile.charAt(0).toUpperCase() + profile.slice(1)}</h4>
                                                    <p className="text-sm text-gray-600">{data.tip}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-gray-600">Risk Level</div>
                                                    <div className={`font-semibold ${profile === 'conservative' ? 'text-green-600' : profile === 'balanced' ? 'text-yellow-600' : 'text-red-600'}`}>
                                                        {profile === 'conservative' ? 'Low' : profile === 'balanced' ? 'Medium' : 'High'}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">Allocation Chart</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <canvas ref={portfolioDonutChartRef} className="w-full h-64"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="text-center py-8">
                    <p className="text-gray-600">
                        This analysis is for educational purposes only. Always consult with a financial advisor before making investment decisions.
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default IndianTitans;
