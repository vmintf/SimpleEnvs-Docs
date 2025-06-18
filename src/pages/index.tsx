import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>

                {/* 성능 하이라이트 - 실제 벤치마크 결과 반영 */}
                <div className={styles.performanceHighlight}>
                    ⚡ 12-27x Faster than python-dotenv
                </div>

                {/* 추가 성능 세부사항 */}
                <div className={styles.performanceDetails}>
                    <span className="performance-badge">27.4x faster at 100 vars</span>
                    <span className="security-badge">100% security tests</span>
                    <span className="performance-badge">32.8% security overhead</span>
                </div>

                {/* CTA 버튼들 */}
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/quickstart">
                        🚀 Quick Start - 5min ⏱️
                    </Link>
                    <Link
                        className="button button--outline button--secondary button--lg"
                        to="https://github.com/vmintf/SimpleEnvs-Python"
                        target="_blank">
                        📦 GitHub
                    </Link>
                    <Link
                        className="button button--outline button--secondary button--lg"
                        to="https://pypi.org/project/simpleenvs-python/"
                        target="_blank">
                        🐍 PyPI
                    </Link>
                </div>

                {/* 간단한 설치 명령어 */}
                <div className={styles.installCommand}>
                    <code>pip install simpleenvs-python</code>
                </div>
            </div>
        </header>
    );
}

// 코드 비교 섹션 컴포넌트
function CodeComparison(): ReactNode {
    return (
        <section className={styles.codeComparison}>
            <div className="container">
                <div className="text--center">
                    <Heading as="h2">🔄 Migration is Just One Line Change</Heading>
                    <p className={styles.sectionSubtitle}>
                        Keep your existing code. Just change the import and get instant performance boost!
                    </p>
                </div>

                <div className="row">
                    <div className="col col--6">
                        <h3 className={styles.beforeTitle}>❌ Before (python-dotenv)</h3>
                        <div className={styles.codeBlock}>
              <pre><code>{`# Old way - slower performance
from dotenv import load_dotenv
import os

load_dotenv()
db_host = os.getenv('DB_HOST')
debug = os.getenv('DEBUG') == 'true'
port = int(os.getenv('PORT', '8080'))`}</code></pre>
                        </div>
                    </div>

                    <div className="col col--6">
                        <h3 className={styles.afterTitle}>✅ After (SimpleEnvs)</h3>
                        <div className={styles.codeBlock}>
              <pre><code>{`# New way - 12-27x faster!
from simpleenvs import load_dotenv
import os

load_dotenv()  # Same API!
db_host = os.getenv('DB_HOST')
debug = os.getenv('DEBUG') == 'true'  
port = int(os.getenv('PORT', '8080'))`}</code></pre>
                        </div>
                    </div>
                </div>

                <div className="text--center" style={{marginTop: '3rem'}}>
                    <h3 className={styles.secureTitle}>🔒 Or Use Secure Mode for Enterprise</h3>
                    <div className={styles.codeBlockLarge}>
            <pre><code>{`# Ultra-secure mode - secrets never touch os.environ!
from simpleenvs import load_dotenv_secure, get_secure

load_dotenv_secure()  # Memory-isolated loading
jwt_secret = get_secure('JWT_SECRET')  # NOT in os.environ!
api_key = get_secure('API_KEY')

# Verify isolation
import os
print(os.getenv('JWT_SECRET'))  # None - properly isolated! 🔒`}</code></pre>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 보안 통계 섹션 컴포넌트
function SecurityStats(): ReactNode {
    return (
        <section className={styles.securityStats}>
            <div className="container">
                <div className="text--center">
                    <Heading as="h2">🛡️ Enterprise-Grade Security Validation</Heading>
                    <p className={styles.sectionSubtitle}>
                        Core security testing with <strong>100% success rate</strong>
                    </p>
                </div>

                <div className="row">
                    <div className="col col--4">
                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>16</div>
                            <div className={styles.statLabel}>Security Tests</div>
                            <div className={styles.statDescription}>Core functionality focused</div>
                        </div>
                    </div>

                    <div className="col col--4">
                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>100%</div>
                            <div className={styles.statLabel}>Success Rate</div>
                            <div className={styles.statDescription}>All tests passed</div>
                        </div>
                    </div>

                    <div className="col col--4">
                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>32.8%</div>
                            <div className={styles.statLabel}>Security Overhead</div>
                            <div className={styles.statDescription}>Reasonable performance cost</div>
                        </div>
                    </div>
                </div>

                {/* 작은 글씨로 핵심 테스트 설명 추가 */}
                <div className="text--center" style={{marginTop: '1rem'}}>
                    <p style={{fontSize: '0.85rem', color: '#666', fontStyle: 'italic'}}>
                        Refined from 53 comprehensive tests to 16 essential core security validations
                    </p>
                </div>

                <div className="text--center" style={{marginTop: '2rem'}}>
                    <div className={styles.securityBadges}>
                        <span className="security-badge">Path Traversal Protected</span>
                        <span className="security-badge">Memory Isolated</span>
                        <span className="security-badge">Input Sanitized</span>
                        <span className="security-badge">Type Safe</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

function BenchmarkSection(): ReactNode {
    const benchmarkData = [
        { variables: '10 vars', fileSize: '482B', pythonDotenv: '1.96ms', simpleenvs: '0.16ms', speedup: '12.4x faster' },
        { variables: '50 vars', fileSize: '1.3KB', pythonDotenv: '5.85ms', simpleenvs: '0.24ms', speedup: '24.6x faster' },
        { variables: '100 vars', fileSize: '2.4KB', pythonDotenv: '10.69ms', simpleenvs: '0.39ms', speedup: '27.4x faster' },
        { variables: '500 vars', fileSize: '11KB', pythonDotenv: '55.34ms', simpleenvs: '1.99ms', speedup: '27.9x faster' },
        { variables: '1000 vars', fileSize: '22KB', pythonDotenv: '106.34ms', simpleenvs: '4.99ms', speedup: '21.3x faster' },
        { variables: '5000 vars', fileSize: '111KB', pythonDotenv: '643.16ms', simpleenvs: '71.25ms', speedup: '9.0x faster' },
    ];

    return (
        <section className={styles.benchmarkSection}>
            <div className="container">
                <div className="text--center">
                    <Heading as="h2">📊 Proven Performance Results</Heading>
                    <p className={styles.sectionSubtitle}>
                        Latest benchmarks on Linux, Python 3.11+ - <strong>Even better performance than initially claimed!</strong>
                    </p>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.benchmarkTable}>
                        <thead>
                        <tr>
                            <th>Test Case</th>
                            <th>File Size</th>
                            <th>python-dotenv</th>
                            <th>SimpleEnvs</th>
                            <th>Performance Gain</th>
                        </tr>
                        </thead>
                        <tbody>
                        {benchmarkData.map((row, idx) => (
                            <tr key={idx}>
                                <td>{row.variables}</td>
                                <td>{row.fileSize}</td>
                                <td>{row.pythonDotenv}</td>
                                <td>{row.simpleenvs}</td>
                                <td className={styles.speedupCell}>{row.speedup} ⚡</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="text--center" style={{marginTop: '2rem'}}>
                    <p className={styles.benchmarkNote}>
                        Run your own benchmarks: <code>python -m simpleenvs.benchmark</code>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default function Home(): ReactNode {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title="SimpleEnvs - Ultra-secure, high-performance .env file loader"
            description="2-4x faster than python-dotenv with enterprise-grade security. Drop-in replacement with memory isolation for sensitive data.">
            <HomepageHeader />
            <main>
                <HomepageFeatures />
                <CodeComparison />
                <BenchmarkSection />
                <SecurityStats />
            </main>
        </Layout>
    );
}