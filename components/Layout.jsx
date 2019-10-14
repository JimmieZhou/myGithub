import { Button } from "antd";
// nextjs路由跳转的两种方式
import Link from "next/link";
import router from "next/router";
const redirectPageB = () => {
    router.push(
        {
            pathname: "/b",
            query: {
                id: 2
            }
        },
        "/b/2"
    );
};
export default ({ children }) => {
    return (
        <>
            <header>
                <Link href="/a?id=1" as="/a/1">
                    <Button>btn_a</Button>
                </Link>
                <Button onClick={redirectPageB}>btn_b</Button>
            </header>
            {children}
        </>
    )
}