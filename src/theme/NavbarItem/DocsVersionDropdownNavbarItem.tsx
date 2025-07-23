import React from 'react';
import DocsVersionDropdownNavbarItem from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';
import { useHistory } from '@docusaurus/router';

export default function DocsVersionDropdownNavbarItemWrapper(props) {
    const history = useHistory();

    // 원본 컴포넌트를 렌더링하되, 클릭 이벤트를 가로채서 커스텀 처리
    return (
        <div onClick={(e) => {
            // 드롭다운 아이템 클릭 시 커스텀 리다이렉트
            const target = (e.target as Element).closest('a');
            if (target && target.href) {
                e.preventDefault();
                const href = target.href;
                const url = new URL(href);
                const pathname = url.pathname;

                // 버전별 리다이렉트 로직
                if (pathname === '/docs' || pathname === '/docs/') {
                    history.push('/stable/introduce');
                } else if (pathname === '/beta' || pathname === '/beta/') {
                    history.push('/docs/beta/introduce');
                } else {
                    history.push(pathname);
                }
            }
        }}>
            <DocsVersionDropdownNavbarItem {...props} />
        </div>
    );
}