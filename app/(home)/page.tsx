import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Zap,
  Package,
  Code2,
  Users,
  Gauge,
  Shield,
  Star,
  GitBranch,
  Download,
  Clock,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Grid pattern background */}
      <div className="fixed inset-0 grid-pattern opacity-50" />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent/10 rounded-full blur-xl float-animation" />
        <div
          className="absolute top-40 right-32 w-24 h-24 bg-chart-2/10 rounded-full blur-xl float-animation"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-32 left-1/3 w-40 h-40 bg-chart-4/10 rounded-full blur-xl float-animation"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Navigation */}
      {/* <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center glow-accent">
            <Code2 className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="text-xl font-bold gradient-text">StateManager</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link
            href="/docs"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/examples"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Examples
          </Link>
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-accent/10 bg-transparent"
          >
            Get Started
          </Button>
        </div>
      </nav> */}

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center py-20">
          <div className="inline-block mb-4 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm text-accent pulse-glow">
            State Management for React
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance">
            The React State
            <br />
            <span className="text-glow gradient-text">Management</span> Guide
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Master the art of state management in React applications. Compare
            and learn the two most popular solutions:
            <span className="text-foreground font-semibold"> Zustand</span> and
            <span className="text-foreground font-semibold"> Redux</span> with
            hands-on examples and best practices.
          </p>

          <div className="mb-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 text-left card-hover">
                <div className="flex items-center space-x-2 mb-4">
                  <Zap className="w-5 h-5 text-chart-2" />
                  <span className="font-semibold text-chart-2">Zustand</span>
                </div>
                <pre className="text-sm text-muted-foreground font-mono overflow-x-auto">
                  {`const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => 
    ({ count: state.count + 1 })
  ),
}))`}
                </pre>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 text-left card-hover">
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-5 h-5 text-chart-4" />
                  <span className="font-semibold text-chart-4">
                    Redux Toolkit
                  </span>
                </div>
                <pre className="text-sm text-muted-foreground font-mono overflow-x-auto">
                  {`const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1
    }
  }
})`}
                </pre>
              </Card>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/zustand">
              <Button size="lg" className="glow-primary group cursor-pointer">
                Explore Zustand
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            {/* <Link href="/redux">
              <Button
                size="lg"
                variant="outline"
                className="group bg-transparent hover:bg-primary/10 cursor-pointer"
              >
                Learn Redux
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link> */}

            <ButtonGroup aria-label="Button group">
              <Link href="/redux" className="cursor-pointer">
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:bg-slate-400 bg-slate-200 transition-all duration-300 text-primary-foreground cursor-pointer"
                >
                  Learn Redux Toolkit
                </Button>
              </Link>

              <ButtonGroupSeparator />

              <Link href="/redux/users" className="cursor-pointer">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-primary-foreground text-primary-foreground-foreground cursor-pointer"
                >
                  Redux Thunk
                </Button>
              </Link>
            </ButtonGroup>
          </div>

          <div className="text-sm text-muted-foreground font-mono typing-animation">
            npm install zustand @reduxjs/toolkit
          </div>
        </div>

        <div className="py-20">
          <h2 className="text-3xl font-bold text-center mb-4">
            {"What's the difference?"}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Both are excellent choices for state management. Here is how they
            compare across key factors.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Zustand Card */}
            <Card className="p-8 bg-card/50 backdrop-blur border-border/50 hover:border-chart-2/50 transition-all duration-300 group card-hover">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-chart-2/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-chart-2" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Zustand</h3>
                    <p className="text-sm text-muted-foreground">
                      Simple & Lightweight
                    </p>
                  </div>
                </div>
                <div className="text-xs bg-chart-2/10 text-chart-2 px-2 py-1 rounded-full">
                  2.1kB
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Gauge className="w-4 h-4 text-chart-2" />
                  <span className="text-sm">Minimal boilerplate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Package className="w-4 h-4 text-chart-2" />
                  <span className="text-sm">No providers needed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Code2 className="w-4 h-4 text-chart-2" />
                  <span className="text-sm">TypeScript-first</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-chart-2" />
                  <span className="text-sm">Quick setup</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>45.2k</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GitBranch className="w-3 h-3" />
                  <span>1.2k</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="w-3 h-3" />
                  <span>2.8M/week</span>
                </div>
              </div>

              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Perfect for small to medium apps that need simple, fast state
                  management without complexity.
                </p>
              </div>
            </Card>

            {/* Redux Card */}
            <Card className="p-8 bg-card/50 backdrop-blur border-border/50 hover:border-chart-4/50 transition-all duration-300 group card-hover">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-chart-4/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-chart-4" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Redux</h3>
                    <p className="text-sm text-muted-foreground">
                      Predictable & Powerful
                    </p>
                  </div>
                </div>
                <div className="text-xs bg-chart-4/10 text-chart-4 px-2 py-1 rounded-full">
                  47kB
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-chart-4" />
                  <span className="text-sm">Large ecosystem</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Code2 className="w-4 h-4 text-chart-4" />
                  <span className="text-sm">DevTools integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-chart-4" />
                  <span className="text-sm">Time-travel debugging</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Package className="w-4 h-4 text-chart-4" />
                  <span className="text-sm">Middleware support</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>60.8k</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GitBranch className="w-3 h-3" />
                  <span>15.6k</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="w-3 h-3" />
                  <span>7.2M/week</span>
                </div>
              </div>

              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Ideal for large, complex applications that require predictable
                  state updates and extensive debugging.
                </p>
              </div>
            </Card>
          </div>
        </div>

        <div className="py-20">
          <h2 className="text-2xl font-bold text-center mb-12">
            By the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-card/30 backdrop-blur card-hover">
              <div className="text-3xl font-bold text-chart-2 mb-2">2.1kB</div>
              <div className="text-sm text-muted-foreground">
                Zustand bundle size
              </div>
            </div>
            <div className="text-center p-6 rounded-xl bg-card/30 backdrop-blur card-hover">
              <div className="text-3xl font-bold text-chart-4 mb-2">47kB</div>
              <div className="text-sm text-muted-foreground">
                Redux Toolkit size
              </div>
            </div>
            <div className="text-center p-6 rounded-xl bg-card/30 backdrop-blur card-hover">
              <div className="text-3xl font-bold text-primary mb-2">10M+</div>
              <div className="text-sm text-muted-foreground">
                Combined downloads
              </div>
            </div>
            <div className="text-center p-6 rounded-xl bg-card/30 backdrop-blur card-hover">
              <div className="text-3xl font-bold text-foreground mb-2">
                106K+
              </div>
              <div className="text-sm text-muted-foreground">GitHub stars</div>
            </div>
          </div>
        </div>

        <div className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Feature Comparison
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-card/50 backdrop-blur border-border/50">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-4 px-2">Feature</th>
                      <th className="text-center py-4 px-2 text-chart-2">
                        Zustand
                      </th>
                      <th className="text-center py-4 px-2 text-chart-4">
                        Redux
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-2">Bundle Size</td>
                      <td className="text-center py-3 px-2 text-chart-2">
                        ✓ 2.1kB
                      </td>
                      <td className="text-center py-3 px-2 text-chart-4">
                        ○ 47kB
                      </td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-2">Learning Curve</td>
                      <td className="text-center py-3 px-2 text-chart-2">
                        ✓ Easy
                      </td>
                      <td className="text-center py-3 px-2 text-chart-4">
                        ○ Moderate
                      </td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-2">DevTools</td>
                      <td className="text-center py-3 px-2 text-chart-2">
                        ○ Basic
                      </td>
                      <td className="text-center py-3 px-2 text-chart-4">
                        ✓ Advanced
                      </td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-2">Ecosystem</td>
                      <td className="text-center py-3 px-2 text-chart-2">
                        ○ Growing
                      </td>
                      <td className="text-center py-3 px-2 text-chart-4">
                        ✓ Mature
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">TypeScript</td>
                      <td className="text-center py-3 px-2 text-chart-2">
                        ✓ Excellent
                      </td>
                      <td className="text-center py-3 px-2 text-chart-4">
                        ✓ Excellent
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 text-center">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            Ready to dive deeper?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore detailed guides, examples, and best practices for both state
            management solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/zustand">
              <Button size="lg" className="glow-primary">
                Start with Zustand
              </Button>
            </Link>

            <ButtonGroup aria-label="Button group">
              <Link href="/redux">
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:bg-slate-400 bg-slate-200 transition-all duration-300 text-primary-foreground cursor-pointer"
                >
                  Learn Redux Toolkit
                </Button>
              </Link>

              <Link href="/redux/users">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-primary-foreground text-primary-foreground-foreground cursor-pointer"
                >
                  Redux Thunk
                </Button>
              </Link>
            </ButtonGroup>

            {/* <Link href="/redux">
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-primary/10 bg-transparent"
              >
                Learn Redux Toolkit
              </Button>
            </Link> */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <Code2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold gradient-text">StateManager</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Built with Next.js and Tailwind CSS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
