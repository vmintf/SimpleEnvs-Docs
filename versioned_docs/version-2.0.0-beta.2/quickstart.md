---
id: quickstart
title: Quick Start Guide
sidebar_label: Quick Start
sidebar_position: 3
description: Get up and running with SimpleEnvs in 5 minutes
keywords: [simpleenvs, simpleenvs-python, installation, python, env, dotenv, pip]
---

# Quick Start Guide

Get up and running with SimpleEnvs in 5 minutes! 🚀

## 1. Installation

```bash
pip install simpleenvs-python
```

## 2. Create Your First .env File

Create a file named `.env` in your project root:

```bash
# .env
APP_NAME=MyAwesomeApp
DEBUG=true
PORT=8080
DATABASE_URL=postgresql://user:pass@localhost/mydb
API_KEY=secret-key-here
JWT_SECRET=super-secret-jwt-key
```

## 3. Basic Usage

### Simple Loading (Most Common)

```python
# app.py
from simpleenvs import load_dotenv
import os

# Load .env file
load_dotenv()

# Access variables
app_name = os.getenv('APP_NAME')
debug = os.getenv('DEBUG')
port = int(os.getenv('PORT', 8080))

print(f"Starting {app_name} on port {port}")
print(f"Debug mode: {debug}")
```

**Run it:**
```bash
python app.py
```

**Output:**
```
Starting MyAwesomeApp on port 8080
Debug mode: True
```

## 4. Type-Safe Access (Recommended)

```python
import simpleenvs

# Load environment
simpleenvs.load_dotenv()

# Type-safe getters with automatic conversion
app_name = simpleenvs.get_str('APP_NAME', 'DefaultApp')  # str
debug = simpleenvs.get_bool('DEBUG', False)             # bool
port = simpleenvs.get_int('PORT', 8080)                 # int

print(f"App: {app_name} | Debug: {debug} | Port: {port}")
```

## 5. Async Usage ⚡ 

**NEW in beta.2:** Enhanced async support with dedicated functions!

### Basic Async Loading

```python
import asyncio
import simpleenvs

async def main():
    # Method 1: Direct async loading
    await simpleenvs.load()
    
    # Method 2: Async one-liner (NEW!)
    # await simpleenvs.aload_dotenv()  # Alternative approach
    
    # Access variables
    db_url = simpleenvs.get_str('DATABASE_URL')
    print(f"Database: {db_url}")

# Run async
asyncio.run(main())
```

### Advanced Async Patterns

```python
import asyncio
import simpleenvs

async def load_environment_config():
    """Load multiple environment configurations asynchronously"""
    # Load different configs based on environment
    import os
    env = os.getenv('ENVIRONMENT', 'development')
    
    if env == 'production':
        # Production: Use secure async loading
        await simpleenvs.load_secure_async()  # 🆕 NEW!
    else:
        # Development: Standard async loading
        await simpleenvs.aload_dotenv()
    
    return env

async def web_app_startup():
    """Modern web app startup pattern"""
    # Load environment first
    env = await load_environment_config()
    
    # Configure based on loaded environment
    app_name = simpleenvs.get_str('APP_NAME', 'DefaultApp')
    port = simpleenvs.get_int('PORT', 8080)
    
    print(f"🚀 Starting {app_name} in {env} mode on port {port}")
    
    # Additional async initialization can go here
    return {"app_name": app_name, "port": port, "env": env}

# Run the modern async pattern
asyncio.run(web_app_startup())
```

### FastAPI Integration

```python
from fastapi import FastAPI
import simpleenvs

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    """Load environment on FastAPI startup"""
    # Load public configuration
    await simpleenvs.aload_dotenv()
    
    # Load secrets securely (NEW async version!)
    await simpleenvs.load_secure_async()  # 🆕 beta.2 feature!
    
    print("✅ Environment loaded asynchronously")

@app.get("/")
async def read_root():
    return {
        "app": simpleenvs.get_str("APP_NAME"),
        "version": simpleenvs.get_str("VERSION", "1.0.0"),
        # Secure data remains isolated
        "has_secrets": simpleenvs.get_secure("JWT_SECRET") is not None
    }
```

## 6. Secure Mode (Enterprise) 🔒

**Enhanced in beta.2:** Now with dedicated async support!

### Synchronous Secure Loading

```python
import simpleenvs
import os

# Load with maximum security (memory-isolated)
simpleenvs.load_dotenv_secure()

# Access secure variables (NOT in os.environ!)
api_key = simpleenvs.get_secure('API_KEY')
jwt_secret = simpleenvs.get_secure('JWT_SECRET')

# Verify security isolation
print(f"API Key loaded: {api_key is not None}")
print(f"In os.environ: {os.getenv('API_KEY')}")  # None - properly isolated! 🔒
```

### Asynchronous Secure Loading 🆕

**NEW in beta.2:** Dedicated async secure functions!

```python
import asyncio
import simpleenvs
import os

async def secure_async_example():
    # Method 1: load_secure_async (internal API)
    await simpleenvs.load_secure_async()
    
    # Method 2: load_dotenv_secure_async (one-liner) 🆕 NEW!
    # await simpleenvs.load_dotenv_secure_async()
    
    # Access secure variables (NOT in os.environ!)
    api_key = simpleenvs.get_secure('API_KEY')
    jwt_secret = simpleenvs.get_secure('JWT_SECRET')
    
    # Verify security isolation
    print(f"API Key loaded: {api_key is not None}")
    print(f"JWT Secret loaded: {jwt_secret is not None}")
    print(f"API_KEY in os.environ: {os.getenv('API_KEY')}")  # None!
    print(f"JWT_SECRET in os.environ: {os.getenv('JWT_SECRET')}")  # None!

# Run the async secure example
asyncio.run(secure_async_example())
```

### Mixed Async Pattern (Production-Ready)

```python
import asyncio
import simpleenvs

async def production_startup():
    """Production-ready async environment loading"""
    
    # Load public configuration first
    await simpleenvs.aload_dotenv('.env.public')
    
    # Load secrets with strict security (async!)
    await simpleenvs.load_dotenv_secure_async('.env.secrets', strict=True)  # 🆕
    
    # Verify everything loaded
    app_name = simpleenvs.get_str('APP_NAME', 'MyApp')
    debug_mode = simpleenvs.get_bool('DEBUG', False)
    
    # Secure variables
    db_password = simpleenvs.get_secure('DATABASE_PASSWORD')
    jwt_secret = simpleenvs.get_secure('JWT_SECRET')
    
    print(f"🚀 {app_name} starting with debug={debug_mode}")
    print(f"🔒 Secrets loaded: {all([db_password, jwt_secret])}")
    
    return {
        "public_config": {"app_name": app_name, "debug": debug_mode},
        "secrets_loaded": all([db_password, jwt_secret])
    }

# Run production startup
result = asyncio.run(production_startup())
print(f"Startup result: {result}")
```

**Security Benefits:**
- ✅ Memory isolation - secrets never touch system environment
- ✅ Access logging for security auditing  
- ✅ File integrity verification with SHA-256
- ✅ Protection against path traversal attacks
- ✅ **NEW:** Full async support for non-blocking security

## 7. Auto-Discovery

SimpleEnvs automatically finds your .env files:

```bash
# Your project structure
my-project/
├── app.py                    # Run from here
├── .env                      # ✅ Found automatically!
├── config/
│   └── .env.production       # ✅ Found automatically!
├── environments/
│   ├── .env.development      # ✅ Found automatically!
│   └── .env.secrets          # ✅ Found automatically!
└── docker/
    └── .env.docker          # ✅ Found automatically!
```

```python
# No path needed - auto-discovery!
from simpleenvs import load_dotenv
load_dotenv()  # Finds the first .env file automatically

# Async auto-discovery (NEW!)
from simpleenvs import aload_dotenv
await aload_dotenv()  # Async auto-discovery!
```

## 8. Performance Comparison ⚡

**SimpleEnvs vs python-dotenv benchmark results:**

| Variables | python-dotenv | SimpleEnvs | **Speedup** |
|-----------|---------------|-------------|-------------|
| 10 vars | 2.0ms | 0.1ms | **13.5x faster** ⚡ |
| 100 vars | 10.9ms | 0.4ms | **28.3x faster** ⚡ |
| 1000 vars | 105.1ms | 5.0ms | **20.9x faster** ⚡ |
| 5000 vars | 633.3ms | 72.5ms | **8.7x faster** ⚡ |

*Real benchmark data from our test suite*

## 9. Common Patterns

### Web Application Startup

```python
# main.py
import simpleenvs
from fastapi import FastAPI

app = FastAPI()

@app.on_event("startup")
async def startup():
    # Load public configuration
    await simpleenvs.aload_dotenv()  # 🆕 Cleaner async loading
    
    # Load secrets securely (async!)
    await simpleenvs.load_dotenv_secure_async()  # 🆕 NEW!

@app.get("/")
def read_root():
    return {
        "app": simpleenvs.get_str("APP_NAME"),
        "version": simpleenvs.get_str("VERSION", "1.0.0"),
        # Secure data remains isolated
        "has_secrets": simpleenvs.get_secure("JWT_SECRET") is not None
    }
```

### Environment-Specific Loading

```python
import os
import simpleenvs

async def load_environment_config():
    # Auto-detect environment
    env = os.getenv('ENVIRONMENT', 'development')
    
    if env == 'production':
        # Maximum security for production
        await simpleenvs.load_dotenv_secure_async(f'.env.{env}', strict=True)
    else:
        # Standard loading for development
        await simpleenvs.aload_dotenv(f'.env.{env}')
    
    return env

# Usage
env = await load_environment_config()
print(f"Loaded {env} environment")
```

### Configuration Class (Async)

```python
import simpleenvs

class AsyncConfig:
    def __init__(self):
        self.loaded = False
    
    async def initialize(self):
        """Async initialization of configuration"""
        # Load public configuration
        await simpleenvs.aload_dotenv()
        
        # Load secrets separately (NEW async version!)
        await simpleenvs.load_dotenv_secure_async()
        
        # Public configuration
        self.app_name = simpleenvs.get_str('APP_NAME', 'MyApp')
        self.debug = simpleenvs.get_bool('DEBUG', False)
        self.port = simpleenvs.get_int('PORT', 8080)
        
        # Secure configuration
        self.jwt_secret = simpleenvs.get_secure('JWT_SECRET')
        self.api_key = simpleenvs.get_secure('API_KEY')
        
        self.loaded = True
        return self

# Usage
config = await AsyncConfig().initialize()
print(f"✅ {config.app_name} configured on port {config.port}")
```

## 10. Migration from python-dotenv

**Instant migration** - just change the import:

```python
# Before (python-dotenv)
from dotenv import load_dotenv
load_dotenv()

# After (SimpleEnvs) - Only change the import!
from simpleenvs import load_dotenv
load_dotenv()  # Same API, 2-28x faster performance! ⚡
```

**Enhanced async migration:**

```python
# Before (python-dotenv - no async support)
from dotenv import load_dotenv
load_dotenv()

# After (SimpleEnvs beta.2 - full async support!)
from simpleenvs import aload_dotenv
await aload_dotenv()  # Native async support! 🚀
```

## 11. Beta.2 API Reference Summary

### 🆕 New Functions in Beta.2

```python
# New async secure functions
await simpleenvs.load_secure_async(path=None, strict=True, max_depth=2)
await simpleenvs.load_dotenv_secure_async(path=None, strict=True)

# Enhanced existing functions
await simpleenvs.aload_dotenv(path=None)  # Now uses simpleenvs.load() internally
```

### Function Comparison Table

| Function | Type | Security | Beta.2 Changes |
|----------|------|----------|---------------|
| `load_dotenv()` | Sync | Basic | ✅ No change |
| `aload_dotenv()` | Async | Basic | 🔄 Improved implementation |
| `load_dotenv_secure()` | Sync | Maximum | ✅ No change |
| `load_dotenv_secure_async()` | Async | Maximum | 🆕 **NEW!** |
| `load_secure_async()` | Async | Maximum | 🆕 **NEW!** |

## 12. Error Handling

```python
import simpleenvs

async def safe_environment_loading():
    """Safe async environment loading with error handling"""
    try:
        # Try secure loading first
        await simpleenvs.load_dotenv_secure_async()
        
        # Validate required variables
        required_vars = ['DATABASE_URL', 'API_KEY', 'JWT_SECRET']
        missing = []
        
        for var in required_vars:
            if not simpleenvs.get_secure(var):
                missing.append(var)
        
        if missing:
            raise ValueError(f"Missing required secure variables: {missing}")
            
    except FileNotFoundError:
        print("⚠️ No .env file found - using defaults")
        # Fallback to standard loading
        await simpleenvs.aload_dotenv()
        
    except simpleenvs.SimpleEnvsError as e:
        print(f"❌ Configuration error: {e}")
        raise
    
    print("✅ Environment loaded successfully")

# Usage
await safe_environment_loading()
```

## 13. Best Practices ✅

### ✅ Do This (Beta.2 Recommendations)

```python
# Use new async secure loading for production
await simpleenvs.load_dotenv_secure_async('.env.production', strict=True)

# Use type-safe getters with defaults
debug = simpleenvs.get_bool('DEBUG', False)
port = simpleenvs.get_int('PORT', 8080)

# Separate public and private configuration
await simpleenvs.aload_dotenv('.env.public')        # Public config
await simpleenvs.load_dotenv_secure_async('.env.secrets')  # Secrets

# Provide meaningful defaults
app_name = simpleenvs.get_str('APP_NAME', 'MyApplication')
```

### ❌ Avoid This

```python
# Don't mix sync and async inconsistently
simpleenvs.load_dotenv_secure()      # Sync
await simpleenvs.aload_dotenv()      # Async - inconsistent!

# Don't rely on manual string conversion
port = int(os.getenv('PORT'))  # Can crash if PORT is not set!

# Don't expose secrets in system environment
os.environ['SECRET_KEY'] = secret  # Visible to all processes ⚠️
```

## 14. Next Steps

🎉 **Congratulations!** You're now using SimpleEnvs beta.2 effectively.

**Continue learning:**
- 📖 [API Reference](api-reference.md) - Complete function documentation  
- 🔒 [Security Guide](security.md) - Advanced security features
- 🏗️ [Examples](https://github.com/vmintf/SimpleEnvs-Python/blob/main/examples) - Real-world usage examples
- ⚡ [Benchmark Suite](https://github.com/vmintf/SimpleEnvs-Python/blob/main/src/simpleenvs/benchmark.py) - Run your own performance tests

**Beta.2 Specific Resources:**
- 🆕 [Migration Guide](migration.md) - Beta.1 to Beta.2 migration
- 🔄 [Async Best Practices](async-patterns.md) - Modern async patterns
- 🚀 [Performance Guide](performance.md) - Optimization tips

**Need help?**
- 🐛 [Report issues](https://github.com/vmintf/SimpleEnvs-Python/issues)
- 💬 [Join discussions](https://github.com/vmintf/SimpleEnvs-Python/discussions)  
- 📧 [Contact support](mailto:vmintf@gmail.com)

---

**Ready to level up?** Explore [API Reference](api-reference.md) for complete beta.2 documentation! 🚀

*SimpleEnvs v2.0.0-beta.2 - Async-first environment loading* ⚡🔒