import type { ReactNode } from 'react'
import { ConfigProvider } from 'antd'
import ruRU from 'antd/locale/ru_RU'

export const AntProvider = (component: () => ReactNode) => () => {
 return (
                <ConfigProvider
                    locale={ruRU}
                    theme={{
                        token: {
                            colorPrimary: '#1677ff',
                            borderRadius: 10,
                        },
                    }}
                >
                    {component()}
                </ConfigProvider>
            )
        }
