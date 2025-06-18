import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
    title: string;
    Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
    description: ReactNode;
    icon: string;
};

const FeatureList: FeatureItem[] = [
    {
        title: '⚡ Superior Performance',
        icon: '⚡',
        description: (
            <div>
                <p><strong>12-27x faster</strong> than python-dotenv</p>
                <ul className={styles.featureList}>
                    <li>Peak 27.4x speed at 100 variables</li>
                    <li>Consistent gains across all file sizes</li>
                    <li>Optimized parsing engine</li>
                    <li>Memory-efficient operations</li>
                </ul>
            </div>
        ),
    },
    {
        title: '🔒 Enterprise Security',
        icon: '🔒',
        description: (
            <div>
                <p><strong>100% security tests passed</strong></p>
                <ul className={styles.featureList}>
                    <li>Memory-isolated secure mode</li>
                    <li>16 comprehensive security tests</li>
                    <li>Path traversal protection</li>
                    <li>Input validation & sanitization</li>
                </ul>
            </div>
        ),
    },
    {
        title: '🔄 Drop-in Replacement',
        icon: '🔄',
        description: (
            <div>
                <p><strong>100% compatible</strong> with python-dotenv</p>
                <ul className={styles.featureList}>
                    <li>Same API, better performance</li>
                    <li>Just change the import!</li>
                    <li>Instant migration</li>
                    <li>Zero breaking changes</li>
                </ul>
            </div>
        ),
    },
];

function Feature({title, icon, description}: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className={styles.featureCard}>
                <div className={styles.featureIcon}>{icon}</div>
                <Heading as="h3" className={styles.featureTitle}>
                    {title}
                </Heading>
                <div className={styles.featureDescription}>{description}</div>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): ReactNode {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}