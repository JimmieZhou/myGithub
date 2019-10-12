
import Link from 'next/link'
import { Button } from 'antd'
export default ({ children }) => (
  <>
    <header>
      <Link href="/test/a?id=1" as="/test/a/1">
        <Button>Index1</Button>
      </Link>
      <Link href="/test/a?id=2" as="/test/a/2">
        <Button>Index2</Button>
      </Link>
    </header>
    {children}
  </>
)